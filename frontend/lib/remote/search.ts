import { fetcher, Loadable, ROOT_URL } from "./common";
import { ContestantItem } from "./user";
import { TaskItem } from "./task";
import { ContestItem } from "./contest";
import { RegionItem } from "./region";
import useSWR from "swr";

export type SearchResultTask = {
  year: number;
  task: TaskItem;
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
  | { task: SearchResultTask }
  | SearchResultContest
  | SearchResultRegion;

export type SearchResultList = {
  results: SearchResult[];
};

export function useSearchResults(q: string): Loadable<SearchResultList> {
  const { data, error } = useSWR(
    `${ROOT_URL}/search?q=${encodeURIComponent(q)}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
