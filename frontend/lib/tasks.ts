import { readFile } from "node:fs/promises";

import { z } from "zod";

import { getTaskImage } from "~/lib/task";

import { baseTaskSchema, navigationSchema } from "./common";

export const taskSchema = baseTaskSchema
  .extend({
    max_score: z.number().nullable(),
    avg_score: z.number().nullable(),
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

const tasksSchema = z
  .object({
    tasks: z
      .object({
        year: z.number(),
        tasks: taskSchema.array(),
      })
      .strict()
      .array(),
  })
  .strict();

export type Tasks = z.infer<typeof taskSchema>[];

export async function getTasks(): Promise<Tasks> {
  const { tasks } = await tasksSchema.parseAsync(
    JSON.parse(await readFile(`../data/tasks.json`, "utf8")),
  );
  return tasks.flatMap((task) => task.tasks);
}
