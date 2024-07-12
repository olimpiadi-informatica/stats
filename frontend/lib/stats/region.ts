import { type ZodRawShape, z } from "zod";

import { medalsSchema } from "~/lib/common";
import { getRegionImage } from "~/lib/region";

function regionSchema<T extends ZodRawShape>(schema: T) {
  return z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .extend(schema)
    .strict()
    .transform(async (region) => ({ ...region, image: await getRegionImage(region.id as string) }));
}

const regionWithMostMedalsSchema = z.object({
  first: regionSchema({ num_medals: medalsSchema }),
  second: regionSchema({ num_medals: medalsSchema }),
});

const regionWithMostMedalsPerParticipantSchema = regionSchema({
  medals_per_participant: z.number(),
});

const regionWithMostFirstPlacesSchema = regionSchema({
  num_first_places: z.number(),
});

const regionWithMostParticipantsSchema = regionSchema({
  num_participants: z.number(),
});

export const regionStatSchema = z.union([
  z.object({ region_with_most_medals: regionWithMostMedalsSchema }).strict(),
  z
    .object({ region_with_most_medals_per_participant: regionWithMostMedalsPerParticipantSchema })
    .strict(),
  z.object({ region_with_most_first_places: regionWithMostFirstPlacesSchema }).strict(),
  z.object({ region_with_most_participants: regionWithMostParticipantsSchema }).strict(),
]);

export type RegionStat = z.infer<typeof regionStatSchema>;
