import { Contestant, loadJSON } from "./common";

export type TaskItem = {
  contest_year: number;
  name: string;
  title: string;
  link: string | null;
  index: number;
  max_score_possible: number | null;
  max_score: number | null;
  avg_score: number | null;
};

export type TaskYear = {
  year: number;
  tasks: TaskItem[];
};

type TaskNavigationItem = {
  year: number;
  name: string;
};

type TaskDetailScore = {
  contestant: Contestant;
  ioi: boolean;
  rank: number | null;
  score: number | null;
};

export type TaskDetail = {
  contest_year: number;
  name: string;
  title: string;
  link: string | null;
  index: number;
  navigation: {
    current: TaskNavigationItem;
    previous: TaskNavigationItem | null;
    next: TaskNavigationItem | null;
  };
  max_score_possible: number | null;
  scores: TaskDetailScore[];
};

export type TaskList = {
  tasks: TaskYear[];
};

export async function getTaskList(): Promise<TaskList> {
  return await loadJSON("tasks.json");
}

export async function getTask(year: number, name: string): Promise<TaskDetail> {
  return await loadJSON(`tasks/${year}/${name}.json`);
}
