import { join, extname } from "node:path";

import { interpolateName } from "loader-utils";
import sharp from "sharp";
import sizeOf from "image-size";

/**
 * @this {import("webpack").loader.LoaderContext}
 * @param {string} source
 */
export default async function imageLoader(source) {
  const cb = this.async();
  const { isDev } = this.getOptions();

  let image;
  if (extname(this.resourcePath) === ".svg") {
    const size = sizeOf(this.resourcePath);
    image = {
      src: emitFile(this, "/static/media/[name].[hash:8].[ext]", source),
      width: size.width,
      height: size.height,
    };
  } else {
    const params = new URLSearchParams(this.resourceQuery);

    const width = Number(params.get("w")) || undefined;
    const height = Number(params.get("h")) || undefined;
    const fit = params.get("fit") || undefined;

    if (!isDev && (width || height)) {
      const [_1x, _2x, _3x] = await Promise.all(
        [1, 2, 3].map((factor) => optimizeImage(this, {
          width: width && factor * width,
          height: height && factor * height,
          fit,
        }))
      );
      image = _1x;
      image.srcSet = `${_1x.src} 1x, ${_2x.src} 2x, ${_3x.src} 3x`;
    } else {
      image = await optimizeImage(this);
      image.srcSet = image.src;
    }
  }

  cb(null, `export default ${JSON.stringify(image)};`);
}

async function optimizeImage(ctx, options) {
  let process = sharp(ctx.resourcePath).webp().rotate();
  if (options?.width || options?.height) {
    process = process.resize(options);
  }
  const { data, info } = await process.toBuffer({ resolveWithObject: true });

  return {
    src: emitFile(ctx, "/static/media/[name].[hash:8].webp", data),
    width: info.width,
    height: info.height,
  };
}

function emitFile(ctx, name, data) {
  const { compilerType, isDev } = ctx.getOptions();

  const fileName = interpolateName(ctx, name, { content: data });
  const outputPath = compilerType === "client"
    ? fileName
    : join("..", isDev ? "" : "..", fileName);
  ctx.emitFile(outputPath, data);

  return join("/_next", fileName);
}
