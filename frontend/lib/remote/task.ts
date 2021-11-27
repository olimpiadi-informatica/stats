import { ROOT_URL, Contestant } from "./common";

export type TaskItem = {
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

// async function loadTasksList(): Promise<TaskYear[]> {
//   return axios.get(`${ROOT_URL}/tasks`).then(res => {
//     return res.data.tasks;
//   });
// }

// async function loadTaskDetail(year: number, name: string): Promise<TaskDetail> {
//   return axios.get(`${ROOT_URL}/tasks/${year}/${name}`).then(res => {
//     return res.data;
//   });
// }

// export { TaskYear, TaskItem, TaskDetail, loadTasksList, loadTaskDetail };
