import { readFile } from "node:fs/promises";

import type { StaticImageData } from "next/image";

import { z } from "zod";

import { getRegionImage } from "~/lib/region";

import { contestantSchema, internationalSchema, medalSchema, medalsSchema } from "./common";

const taskSchema = z
  .object({
    task: z.string(),
    score: z.number().nullable(),
    max_score_possible: z.number().nullable(),
  })
  .strict();

const participationSchema = z
  .object({
    year: z.number(),
    internationals: internationalSchema.array(),
    medal: medalSchema,
    rank: z.number().nullable(),
    region: z.string().nullable(),
    scores: taskSchema.array(),
  })
  .strict()
  .transform(async (participation) => ({
    ...participation,
    regionImage: participation.region ? await getRegionImage(participation.region) : null,
  }));

const userSchema = z
  .object({
    contestant: contestantSchema,
    num_medals: medalsSchema,
    best_rank: z.number().nullable(),
    participations: participationSchema.array(),
  })
  .strict()
  .transform(async (user) => ({ ...user, image: await getUserImage(user.contestant.id) }));

export type User = z.infer<typeof userSchema>;

export async function getUser(id: string): Promise<User> {
  return userSchema.parseAsync(JSON.parse(await readFile(`../data/users/${id}.json`, "utf8")));
}

export async function getUserImage(id: string): Promise<StaticImageData | null> {
  try {
    const { default: image } = await import(
      `/../static/contestants/${id}.jpg?w=208&h=208&fit=outside`
    );
    return image;
  } catch {
    return null;
  }
}
