import { cache } from "react";

import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "./db";
import { taskScores, tasks, users } from "./db/schema";

export type UserTaskScore = {
  year: number;
  taskName: string;
  score: number | null;
  maxScorePossible: number | null;
};

export const getUserTaskScores = cache((userId: string, year: number): Promise<UserTaskScore[]> => {
  return db
    .select({
      year: taskScores.contestYear,
      taskName: taskScores.taskName,
      score: taskScores.score,
      maxScorePossible: tasks.maxScorePossible,
    })
    .from(taskScores)
    .innerJoin(
      tasks,
      and(eq(taskScores.taskName, tasks.name), eq(taskScores.contestYear, tasks.contestYear)),
    )
    .where(and(eq(taskScores.userId, userId), eq(taskScores.contestYear, year)))
    .orderBy(tasks.idx);
});

export type TaskTaskScore = {
  userId: string;
  firstName: string | null;
  lastName: string;
  score: number | null;
  maxScorePossible: number | null;
  rank: number | null;
};

export const getTaskTaskScores = cache(
  (year: number, taskName: string): Promise<TaskTaskScore[]> => {
    return db
      .select({
        userId: taskScores.userId,
        firstName: users.firstName,
        lastName: users.lastName,
        score: taskScores.score,
        maxScorePossible: tasks.maxScorePossible,
        rank: sql<number>`RANK() OVER (ORDER BY ${taskScores.score} DESC)`.as("rank"),
      })
      .from(taskScores)
      .innerJoin(users, eq(users.id, taskScores.userId))
      .innerJoin(
        tasks,
        and(eq(taskScores.taskName, tasks.name), eq(taskScores.contestYear, tasks.contestYear)),
      )
      .where(and(eq(taskScores.contestYear, year), eq(taskScores.taskName, taskName)))
      .orderBy(desc(taskScores.score), users.firstName, users.lastName, users.id);
  },
);
