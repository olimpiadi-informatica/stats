import { readFile } from "node:fs/promises";

import type { StaticImageData } from "next/image";

import { z } from "zod";

import { baseTaskSchema, locationSchema, navigationSchema } from "./common";

const medalSchema = z
  .object({
    count: z.number().nullable(),
    cutoff: z.number().nullable(),
  })
  .strict();

export const contestSchema = z
  .object({
    year: z.number(),
    navigation: navigationSchema(z.number()),
    location: locationSchema,
    region: z.string().nullable(),
    num_contestants: z.number(),
    max_score: z.number().nullable(),
    max_score_possible: z.number().nullable(),
    avg_score: z.number().nullable(),
    tasks: baseTaskSchema.array(),
    medals: z
      .object({
        gold: medalSchema,
        silver: medalSchema,
        bronze: medalSchema,
      })
      .strict(),
  })
  .strict()
  .transform(async (contest) => ({ ...contest, image: await getContestImage(contest.year) }));

const contestsSchema = z.object({ contests: contestSchema.array() }).strict();

export type Contest = z.infer<typeof contestSchema>;

export async function getContest(year: number | string): Promise<Contest> {
  return contestSchema.parseAsync(
    JSON.parse(await readFile(`../data/contests/${year}.json`, "utf8")),
  );
}

export async function getContests(): Promise<Contest[]> {
  const { contests } = await contestsSchema.parseAsync(
    JSON.parse(await readFile("../data/contests.json", "utf8")),
  );
  return contests;
}

export async function getContestImage(year: number | string): Promise<StaticImageData | null> {
  try {
    const { default: image } = await import(`/../static/contests/${year}.jpg?w=176`);
    return image;
  } catch {
    return null;
  }
}
