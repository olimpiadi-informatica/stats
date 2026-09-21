import { createHash } from "node:crypto";
import fs from "node:fs";
import { mkdir, open, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { imageSizeFromFile } from "image-size/fromFile";
import { lock } from "proper-lockfile";
import sharp from "sharp";

export type ImageData = {
  src: string;
  width: number;
  height: number;
  srcSet?: string;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
};

export type ImageOptions = {
  width?: number;
  height?: number;
  fit?: "inside" | "outside" | "cover" | "contain" | "fill";
};

export type ImageCategory = "tasks" | "contestants" | "contests" | "regions" | "navbar";

function getStaticDir(): string {
  return path.resolve(
    process.cwd(),
    fs.existsSync(path.join(process.cwd(), "../static")) ? "../static" : "static",
  );
}

function getCacheDir(): string {
  return process.env.IMAGE_CACHE_DIR || path.resolve(process.cwd(), ".cache/images");
}

function getBuffersDir(): string {
  return path.join(getCacheDir(), "buffers");
}

function getMetaDir(): string {
  return path.join(getCacheDir(), "meta");
}

export function resolveSourceFile(category: ImageCategory, id: string): string | null {
  const staticDir = getStaticDir();
  let filePath: string;

  if (category === "tasks") {
    filePath = path.join(staticDir, "tasks", `${id}.png`);
  } else if (category === "contestants") {
    filePath = path.join(staticDir, "contestants", `${id}.jpg`);
    if (!fs.existsSync(filePath)) {
      const upperPath = path.join(staticDir, "contestants", `${id}.JPG`);
      if (fs.existsSync(upperPath)) {
        return upperPath;
      }
    }
  } else if (category === "contests") {
    filePath = path.join(staticDir, "contests", `${id}.jpg`);
  } else if (category === "regions") {
    filePath = path.join(staticDir, "regions", `${id}.svg`);
  } else if (category === "navbar") {
    filePath = path.join(process.cwd(), "app", `${id}.png`);
  } else {
    return null;
  }

  return fs.existsSync(filePath) ? filePath : null;
}

function getEffectiveOptions(category: ImageCategory): ImageOptions {
  switch (category) {
    case "tasks":
      return { width: 208, height: 208, fit: "inside" };
    case "contestants":
      return { width: 208, height: 208, fit: "outside" };
    case "contests":
      return { width: 176 };
    case "navbar":
      return { height: 32 };
    default:
      return {};
  }
}

function verifyBuffersExist(category: ImageCategory, id: string): boolean {
  const buffersDir = getBuffersDir();
  if (category === "regions") {
    return fs.existsSync(path.join(buffersDir, "regions", `${id}.svg`));
  }
  return (
    fs.existsSync(path.join(buffersDir, category, `${id}.webp`)) &&
    fs.existsSync(path.join(buffersDir, category, `${id}@2x.webp`)) &&
    fs.existsSync(path.join(buffersDir, category, `${id}@3x.webp`))
  );
}

async function transformAndSaveBuffers(
  category: ImageCategory,
  id: string,
  sourcePath: string,
  options: ImageOptions,
): Promise<ImageData> {
  const buffersDir = getBuffersDir();

  if (category === "regions") {
    const destPath = path.join(buffersDir, "regions", `${id}.svg`);
    await mkdir(path.dirname(destPath), { recursive: true });
    const buffer = await readFile(sourcePath);
    const size = await imageSizeFromFile(sourcePath);
    await writeFile(destPath, buffer);
    return {
      src: `/media/regions/${id}.svg`,
      width: size.width ?? 0,
      height: size.height ?? 0,
    };
  }

  const width = options.width;
  const height = options.height;
  const fit = options.fit;
  const factors = [1, 2, 3] as const;

  let _1xWidth = 0;
  let _1xHeight = 0;

  for (const factor of factors) {
    let pipeline = sharp(sourcePath).rotate().webp();
    if (width || height) {
      pipeline = pipeline.resize({
        width: width ? factor * width : undefined,
        height: height ? factor * height : undefined,
        fit,
      });
    }
    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
    if (factor === 1) {
      _1xWidth = info.width;
      _1xHeight = info.height;
    }
    const factorSuffix = factor === 1 ? "" : `@${factor}x`;
    const destPath = path.join(buffersDir, category, `${id}${factorSuffix}.webp`);
    await mkdir(path.dirname(destPath), { recursive: true });
    await writeFile(destPath, data);
  }

  return {
    src: `/media/${category}/${id}.webp`,
    srcSet: `/media/${category}/${id}.webp 1x, /media/${category}/${id}@2x.webp 2x, /media/${category}/${id}@3x.webp 3x`,
    width: _1xWidth,
    height: _1xHeight,
  };
}

const inFlight = new Map<string, Promise<ImageData | null>>();

export async function getImageMetadata(
  category: ImageCategory,
  id: string,
): Promise<ImageData | null> {
  const sourcePath = resolveSourceFile(category, id);
  if (!sourcePath) {
    return null;
  }

  const options = getEffectiveOptions(category);
  const st = await stat(sourcePath);

  const cacheKey = {
    category,
    id,
    mtime: st.mtimeMs,
    size: st.size,
    options,
  };
  const keyStr = createHash("sha256").update(JSON.stringify(cacheKey)).digest("hex");

  const existing = inFlight.get(keyStr);
  if (existing) {
    return existing;
  }

  const promise = getImageMetadataWithLock(category, id, sourcePath, options, keyStr);
  inFlight.set(keyStr, promise);
  try {
    return await promise;
  } finally {
    inFlight.delete(keyStr);
  }
}

async function getImageMetadataWithLock(
  category: ImageCategory,
  id: string,
  sourcePath: string,
  options: ImageOptions,
  keyStr: string,
): Promise<ImageData> {
  const metaDir = getMetaDir();
  const cacheFile = path.join(metaDir, `${keyStr}.json`);

  await mkdir(metaDir, { recursive: true });
  const fh = await open(cacheFile, "a+");

  let unlock: () => Promise<void>;
  try {
    unlock = await lock(cacheFile, {
      retries: {
        factor: 1,
        retries: 60,
        minTimeout: 500,
      },
    });
  } catch (err: unknown) {
    await fh.close();
    throw new Error(`Image cache lock timed out for ${category}/${id}: ${String(err)}`);
  }

  let unlocked = false;
  const safeUnlock = async () => {
    if (!unlocked) {
      unlocked = true;
      try {
        await unlock();
      } catch {
        // ignore unlock error if already released
      }
    }
  };

  try {
    try {
      const cachedResult = await fh.readFile("utf8");
      if (cachedResult) {
        const parsed: ImageData = JSON.parse(cachedResult);
        if (verifyBuffersExist(category, id)) {
          return parsed;
        }
      }
    } catch {
      console.warn(`[image-cache] Corrupted cache for ${category}/${id}`);
    }

    const meta = await transformAndSaveBuffers(category, id, sourcePath, options);
    await fh.truncate(0);
    await fh.writeFile(JSON.stringify(meta));
    return meta;
  } finally {
    await safeUnlock();
    await fh.close();
  }
}

export async function getImageBuffer(slug: string[]): Promise<Buffer | null> {
  if (!slug || slug.length === 0) {
    return null;
  }

  const buffersDir = getBuffersDir();
  const bufferPath = path.join(buffersDir, ...slug);

  if (fs.existsSync(bufferPath)) {
    return readFile(bufferPath);
  }

  // Not yet generated in buffersDir: determine category and id
  const category = slug[0] as ImageCategory;
  const subSegments = slug.slice(1);
  if (subSegments.length === 0) {
    return null;
  }

  const lastSegment = subSegments[subSegments.length - 1];
  let baseName = lastSegment;
  if (baseName.endsWith(".webp")) {
    baseName = baseName.slice(0, -5);
  } else if (baseName.endsWith(".svg")) {
    baseName = baseName.slice(0, -4);
  }
  // Strip resolution suffix (@2x or @3x)
  baseName = baseName.replace(/@[23]x$/, "");

  const idParts = [...subSegments.slice(0, -1), baseName];
  const id = idParts.join("/");

  const meta = await getImageMetadata(category, id);
  if (!meta) {
    return null;
  }

  if (fs.existsSync(bufferPath)) {
    return readFile(bufferPath);
  }

  return null;
}

export async function getAllStaticImageSlugs(): Promise<{ slug: string[] }[]> {
  const staticDir = getStaticDir();
  const slugs: { slug: string[] }[] = [];

  // 1. Tasks: static/tasks/*/*.png
  const tasksDir = path.join(staticDir, "tasks");
  if (fs.existsSync(tasksDir)) {
    const years = await fs.promises.readdir(tasksDir);
    for (const year of years) {
      const yearDir = path.join(tasksDir, year);
      const yearStat = await stat(yearDir);
      if (yearStat.isDirectory()) {
        const files = await fs.promises.readdir(yearDir);
        for (const file of files) {
          if (file.endsWith(".png")) {
            const name = file.slice(0, -4);
            slugs.push({ slug: ["tasks", year, `${name}.webp`] });
            slugs.push({ slug: ["tasks", year, `${name}@2x.webp`] });
            slugs.push({ slug: ["tasks", year, `${name}@3x.webp`] });
          }
        }
      }
    }
  }

  // 2. Contestants: static/contestants/*.{jpg,JPG}
  const contestantsDir = path.join(staticDir, "contestants");
  if (fs.existsSync(contestantsDir)) {
    const files = await fs.promises.readdir(contestantsDir);
    for (const file of files) {
      if (file.toLowerCase().endsWith(".jpg")) {
        const id = file.slice(0, -4);
        slugs.push({ slug: ["contestants", `${id}.webp`] });
        slugs.push({ slug: ["contestants", `${id}@2x.webp`] });
        slugs.push({ slug: ["contestants", `${id}@3x.webp`] });
      }
    }
  }

  // 3. Contests: static/contests/*.jpg
  const contestsDir = path.join(staticDir, "contests");
  if (fs.existsSync(contestsDir)) {
    const files = await fs.promises.readdir(contestsDir);
    for (const file of files) {
      if (file.endsWith(".jpg")) {
        const year = file.slice(0, -4);
        slugs.push({ slug: ["contests", `${year}.webp`] });
        slugs.push({ slug: ["contests", `${year}@2x.webp`] });
        slugs.push({ slug: ["contests", `${year}@3x.webp`] });
      }
    }
  }

  // 4. Regions: static/regions/*.svg
  const regionsDir = path.join(staticDir, "regions");
  if (fs.existsSync(regionsDir)) {
    const files = await fs.promises.readdir(regionsDir);
    for (const file of files) {
      if (file.endsWith(".svg")) {
        slugs.push({ slug: ["regions", file] });
      }
    }
  }

  // 5. Navbar
  for (const name of ["oiistats-dark", "oiistats-light"]) {
    slugs.push({ slug: ["navbar", `${name}.webp`] });
    slugs.push({ slug: ["navbar", `${name}@2x.webp`] });
    slugs.push({ slug: ["navbar", `${name}@3x.webp`] });
  }

  return slugs;
}

export async function withImage<T>(
  query: Promise<T[]>,
  getImage: (row: T) => Promise<ImageData | null> | ImageData | null,
): Promise<(T & { image: ImageData | null })[]> {
  const rows = await query;
  return Promise.all(
    rows.map(async (row) => {
      return { ...row, image: await getImage(row) };
    }),
  );
}
