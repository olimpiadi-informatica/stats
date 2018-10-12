import axios from "axios";

import { ROOT_URL } from "./index";
import { ContestantItem } from "./user";
import { TaskItem } from "./task";
import { ContestItem } from "./contest";
import { RegionItem } from "./region";

class SearchResultTask {
  task!: {
    year: number;
    task: TaskItem;
  };
}

class SearchResultUser {
  user!: ContestantItem;
}

class SearchResultContest {
  contest!: ContestItem;
}

class SearchResultRegion {
  region!: RegionItem;
}

type SearchResult =
  | SearchResultUser
  | SearchResultTask
  | SearchResultContest
  | SearchResultRegion;

async function loadSearchResults(q: string): Promise<SearchResult[]> {
  return axios
    .get(`${ROOT_URL}/search?q=${encodeURIComponent(q)}`)
    .then(res => {
      return res.data.results;
    });
}

export {
  SearchResult,
  SearchResultTask,
  SearchResultUser,
  SearchResultContest,
  SearchResultRegion,
  loadSearchResults
};
