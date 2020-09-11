import axios from "axios";

import { ROOT_URL } from "./index";
import { ContestantItem } from "./user";
import { TaskItem } from "./task";
import { ContestItem } from "./contest";
import { RegionItem } from "./region";

export class SearchResultTask {
  task!: {
    year: number;
    task: TaskItem;
  };
}

export class SearchResultUser {
  user!: ContestantItem;
}

export class SearchResultContest {
  contest!: ContestItem;
}

export class SearchResultRegion {
  region!: RegionItem;
}

export type SearchResult = SearchResultUser | SearchResultTask | SearchResultContest | SearchResultRegion;

export async function loadSearchResults(q: string): Promise<SearchResult[]> {
  return axios.get(`${ROOT_URL}/search?q=${encodeURIComponent(q)}`).then(res => {
    return res.data.results;
  });
}
