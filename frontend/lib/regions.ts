import { readFile } from "node:fs/promises";

import { z } from "zod";

import { medalsSchema, navigationSchema } from "./common";
import { getRegionImage } from "./region";

export const regionSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    navigation: navigationSchema(z.string()),
    num_contestants: z.number(),
    avg_contestants_per_year: z.number(),
    medals: medalsSchema,
    hosted: z.number().array(),
  })
  .strict()
  .transform(async (region) => ({ ...region, image: await getRegionImage(region.id) }));

const regionsSchema = z.object({ regions: regionSchema.array() }).strict();

export type Regions = z.infer<typeof regionsSchema>["regions"];

export async function getRegions(): Promise<Regions> {
  const { regions } = await regionsSchema.parseAsync(
    JSON.parse(await readFile("../data/regions.json", "utf8")),
  );
  return regions;
}
