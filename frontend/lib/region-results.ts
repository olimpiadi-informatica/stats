import { readFile } from "node:fs/promises";

import { z } from "zod";

import { contestantSchema, internationalSchema, medalSchema, navigationSchema } from "~/lib/common";

const taskSchema = z
  .object({
    name: z.string(),
    score: z.number().nullable(),
    max_score_possible: z.number().nullable(),
  })
  .strict();

const participantSchema = z
  .object({
    contestant: contestantSchema,
    internationals: internationalSchema.array(),
    rank: z.number().nullable(),
    medal: medalSchema,
    task_scores: taskSchema.array(),
  })
  .strict();

const yearSchema = z
  .object({
    year: z.number(),
    contestants: participantSchema.array(),
  })
  .strict();

const regionResultsSchema = z
  .object({
    navigation: navigationSchema(z.string()),
    results: yearSchema.array(),
  })
  .strict();

export type RegionResults = z.infer<typeof regionResultsSchema>;

export async function getRegionResults(id: string): Promise<RegionResults> {
  return regionResultsSchema.parse(
    JSON.parse(await readFile(`../data/regions/${id}/results.json`, "utf8")),
  );
}
