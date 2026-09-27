import { cache } from "react";

import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "./db";
import { type ParticipationType, participations, taskScores, tasks, users } from "./db/schema";

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
  type: ParticipationType;
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
        rank: sql<
          number | null
        >`CASE WHEN ${participations.type} = 'official' THEN RANK() OVER (PARTITION BY ${participations.type} ORDER BY ${taskScores.score} DESC) ELSE NULL END`.as(
          "rank",
        ),
        type: participations.type,
      })
      .from(taskScores)
      .innerJoin(users, eq(users.id, taskScores.userId))
      .innerJoin(
        tasks,
        and(eq(taskScores.taskName, tasks.name), eq(taskScores.contestYear, tasks.contestYear)),
      )
      .innerJoin(
        participations,
        and(
          eq(participations.userId, taskScores.userId),
          eq(participations.contestYear, taskScores.contestYear),
        ),
      )
      .where(and(eq(taskScores.contestYear, year), eq(taskScores.taskName, taskName)))
      .orderBy(desc(taskScores.score), users.firstName, users.lastName, users.id);
  },
);
