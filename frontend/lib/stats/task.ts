import { type ZodRawShape, z } from "zod";

import { getTaskImage } from "~/lib/task";

function taskSchema<T extends ZodRawShape>(schema: T) {
  return z
    .object({
      contest_year: z.number(),
      name: z.string(),
      title: z.string(),
    })
    .extend(schema)
    .strict()
    .transform(async (task) => ({
      ...task,
      image: await getTaskImage(task.contest_year as number, task.name as string),
    }));
}

const taskWithLowestAvgScoreSchema = taskSchema({
  avg_score: z.number(),
  max_score_possible: z.number(),
});

const taskWithHighestAvgScoreSchema = taskSchema({
  avg_score: z.number(),
  max_score_possible: z.number(),
});

const taskWithLowestMaxScoreSchema = taskSchema({
  max_score: z.number(),
  max_score_possible: z.number(),
});

const taskWithMostZerosSchema = taskSchema({
  num_zeros: z.number(),
  num_participants: z.number(),
});

const taskWithMostFullscoresSchema = taskSchema({
  num_fullscores: z.number(),
  num_participants: z.number(),
});

export const taskStatSchema = z.union([
  z.object({ task_with_lowest_avg_score: taskWithLowestAvgScoreSchema }).strict(),
  z.object({ task_with_highest_avg_score: taskWithHighestAvgScoreSchema }).strict(),
  z.object({ task_with_lowest_max_score: taskWithLowestMaxScoreSchema }).strict(),
  z.object({ task_with_most_zeros: taskWithMostZerosSchema }).strict(),
  z.object({ task_with_most_fullscores: taskWithMostFullscoresSchema }).strict(),
]);

export type TaskStat = z.infer<typeof taskStatSchema>;
