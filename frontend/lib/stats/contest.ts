import { type ZodRawShape, z } from "zod";

import { locationSchema } from "~/lib/common";
import { getContestImage } from "~/lib/contests";

function contestSchema<T extends ZodRawShape>(schema: T) {
  return z
    .object({ year: z.number() })
    .extend(schema)
    .strict()
    .transform(async (contest) => ({
      ...contest,
      image: await getContestImage(contest.year as number),
    }));
}

const contestWithMostParticipantsSchema = contestSchema({ num_participants: z.number() });

const contestWithMostExAequoSchema = contestSchema({ num_ex_aequo: z.number() });

const contestWithMostGirlsSchema = contestSchema({
  num_girls: z.number(),
  num_participants: z.number(),
});

const mostNorthernContestSchema = z
  .object({
    year: z.number(),
    location: locationSchema,
  })
  .strict();

const mostSouthernContestSchema = z
  .object({
    year: z.number(),
    location: locationSchema,
  })
  .strict();

const numBoysGirlsSchema = z
  .object({
    years: z
      .object({
        year: z.number(),
        num_boys: z.number(),
        num_girls: z.number(),
      })
      .strict()
      .array(),
  })
  .strict();

const numParticipantsPerYearSchema = z
  .object({
    years: z
      .object({
        year: z.number(),
        num_participants: z.number(),
      })
      .strict()
      .array(),
  })
  .strict();

const mostUsedLocationSchema = z
  .object({
    location: locationSchema,
    years: z.number().array(),
  })
  .strict();

export const contestStatSchema = z.union([
  z.object({ contest_with_most_participants: contestWithMostParticipantsSchema }).strict(),
  z.object({ contest_with_most_ex_aequo: contestWithMostExAequoSchema }).strict(),
  z.object({ contest_with_most_girls: contestWithMostGirlsSchema }).strict(),
  z.object({ most_northern_contest: mostNorthernContestSchema }).strict(),
  z.object({ most_southern_contest: mostSouthernContestSchema }).strict(),
  z.object({ num_boys_girls: numBoysGirlsSchema }).strict(),
  z.object({ num_participants_per_year: numParticipantsPerYearSchema }).strict(),
  z.object({ most_used_location: mostUsedLocationSchema }).strict(),
]);

export type ContestStat = z.infer<typeof contestStatSchema>;
