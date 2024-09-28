import { readFile } from "node:fs/promises";

import { z } from "zod";

import { contestantSchema, internationalSchema, medalSchema, navigationSchema } from "~/lib/common";
import { getRegionImage } from "~/lib/region";

const pastParticipationSchema = z.object({
  year: z.number(),
  medal: medalSchema,
});

const participantSchema = z
  .object({
    rank: z.number().nullable(),
    contestant: contestantSchema,
    internationals: internationalSchema.array(),
    region: z.string().nullable(),
    score: z.number().nullable(),
    scores: z.number().nullable().array(),
    medal: medalSchema,
    past_participations: pastParticipationSchema.array(),
  })
  .strict()
  .transform(async (participant) => ({
    ...participant,
    regionImage: participant.region ? await getRegionImage(participant.region) : null,
  }));

const contestResultsSchema = z
  .object({
    navigation: navigationSchema(z.number()),
    tasks: z.string().array(),
    results: participantSchema.array(),
  })
  .strict();

export type ContestResults = z.infer<typeof contestResultsSchema>;

export async function getContestResults(year: string | number): Promise<ContestResults> {
  return contestResultsSchema.parseAsync(
    JSON.parse(await readFile(`../data/contests/${year}/results.json`, "utf8")),
  );
}
