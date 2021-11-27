import { ROOT_URL } from "./common";
import { ContestantItem } from "./user";
import { TaskItem } from "./task";
import { ContestItem } from "./contest";
import { RegionItem } from "./region";

export type SearchResultTask = {
  task: {
    year: number;
    task: TaskItem;
  };
};

export type SearchResultUser = {
  user: ContestantItem;
};

export type SearchResultContest = {
  contest: ContestItem;
};

export type SearchResultRegion = {
  region: RegionItem;
};

export type SearchResult =
  | SearchResultUser
  | SearchResultTask
  | SearchResultContest
  | SearchResultRegion;

// export async function loadSearchResults(q: string): Promise<SearchResult[]> {
//   return axios.get(`${ROOT_URL}/search?q=${encodeURIComponent(q)}`).then(res => {
//     return res.data.results;
//   });
// }
