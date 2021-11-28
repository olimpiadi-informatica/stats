import { ROOT_URL, Contestant, Loadable, fetcher, Error } from "./common";
import useSWR from "swr";

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

export function useTaskList(): Loadable<TaskList> {
  const { data, error } = useSWR(`${ROOT_URL}/tasks`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function loadTask(
  year: number,
  name: string
): Promise<TaskDetail | Error> {
  const res = await fetch(`${ROOT_URL}/tasks/${year}/${name}`);
  return await res.json();
}
