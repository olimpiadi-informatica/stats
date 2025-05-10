import type { StaticImageData } from "next/image";
import { cache } from "react";

import { and, desc, eq, max } from "drizzle-orm";

import { db } from "./db";
import { taskScores, tasks } from "./db/schema";
import { withImage } from "./image";

export type Task = {
  name: string;
  title: string | null;
  contestYear: number;
  maxScore: number | null;
  maxScorePossible: number | null;
  link: string | null;
  image: StaticImageData | null;
};

function getTaskQuery() {
  return db
    .select({
      name: tasks.name,
      title: tasks.title,
      contestYear: tasks.contestYear,
      maxScore: max(taskScores.score),
      link: tasks.link,
      maxScorePossible: tasks.maxScorePossible,
    })
    .from(tasks)
    .innerJoin(taskScores, eq(taskScores.taskName, tasks.name))
    .groupBy(tasks.name, tasks.title, tasks.contestYear, tasks.link, tasks.maxScorePossible);
}

export const getTask = cache(async (year: number, name: string): Promise<Task> => {
  const [task] = await withImage(
    getTaskQuery().where(and(eq(tasks.contestYear, year), eq(tasks.name, name))),
    importImage,
  );
  if (!task) throw new Error(`Task ${year}/${name} not found`);
  return task;
});

export const getTasks = cache((): Promise<Task[]> => {
  return withImage(getTaskQuery().orderBy(desc(tasks.contestYear), tasks.idx), importImage);
});

export const getContestTasks = cache((year: number): Promise<Task[]> => {
  return withImage(
    getTaskQuery().where(eq(tasks.contestYear, year)).orderBy(tasks.idx),
    importImage,
  );
});

function importImage(task: Omit<Task, "image">) {
  return import(`/../static/tasks/${task.contestYear}/${task.name}.png?w=208&h=208&fit=inside`);
}
