import { readFile } from "node:fs/promises";

import type { StaticImageData } from "next/image";

import { z } from "zod";

import { locationSchema, medalsSchema, navigationSchema } from "./common";

const yearSchema = z
  .object({
    year: z.number(),
    location: locationSchema,
    num_contestants: z.number(),
    num_medals: medalsSchema,
  })
  .strict();

const regionSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    navigation: navigationSchema(z.string()),
    num_contestants: z.number(),
    avg_contestants_per_year: z.number(),
    medals: medalsSchema,
    hosted: z.number().array(),
    years: yearSchema.array(),
  })
  .strict()
  .transform(async (region) => ({ ...region, image: await getRegionImage(region.id) }));

export type Region = z.infer<typeof regionSchema>;

export async function getRegion(id: string): Promise<Region> {
  return regionSchema.parseAsync(JSON.parse(await readFile(`../data/regions/${id}.json`, "utf8")));
}

export async function getRegionImage(id: string): Promise<StaticImageData> {
  const { default: image } = await import(`/../static/regions/${id}.svg`);
  return image;
}
