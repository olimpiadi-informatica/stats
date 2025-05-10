import type { StaticImageData } from "next/image";

export async function withImage<T>(
  query: Promise<T[]>,
  getImage: (row: T) => Promise<{ default: StaticImageData }>,
): Promise<(T & { image: StaticImageData | null })[]> {
  const rows = await query;
  return Promise.all(
    rows.map(async (row) => {
      return { ...row, image: await importImage(getImage(row)) };
    }),
  );
}

async function importImage(
  promise: Promise<{ default: StaticImageData }>,
): Promise<StaticImageData | null> {
  try {
    const { default: image } = await promise;
    return image;
  } catch {
    return null;
  }
}
