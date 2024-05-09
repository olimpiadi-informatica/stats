import { readFile } from "node:fs/promises";

import type { StaticImageData } from "next/image";

import { z } from "zod";

import { baseTaskSchema, contestantSchema, internationalSchema, navigationSchema } from "./common";

const scoreSchema = z
  .object({
    contestant: contestantSchema,
    internationals: internationalSchema.array(),
    rank: z.number().nullable(),
    score: z.number().nullable(),
  })
  .strict();

const taskSchema = baseTaskSchema
  .extend({
    max_score: z.number().nullable(),
    scores: scoreSchema.array(),
    navigation: navigationSchema(
      z
        .object({
          year: z.number(),
          name: z.string(),
        })
        .strict(),
    ),
  })
  .strict()
  .transform(async (task) => ({
    ...task,
    image: await getTaskImage(task.contest_year, task.name),
  }));

export type Task = z.infer<typeof taskSchema>;

export async function getTask(year: string | number, name: string): Promise<Task> {
  return taskSchema.parseAsync(
    JSON.parse(await readFile(`../data/tasks/${year}/${name}.json`, "utf8")),
  );
}

export async function getTaskImage(
  year: string | number,
  name: string,
): Promise<StaticImageData | null> {
  try {
    const { default: image } = await import(
      `/../static/tasks/${year}/${name}.png?w=208&h=208&fit=inside`
    );
    return image;
  } catch {
    return null;
  }
}
