import { loadJSON } from "./common";
import { ContestantItem } from "./user";
import { TaskItem } from "./task";
import { ContestItem } from "./contest";
import { RegionItem } from "./region";
import MiniSearch, { AsPlainObject, Options } from "minisearch";

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

export type SearchIndexItem = {
  id: string;
  k: string;
  v: SearchResult;
};

export type SearchIndex = SearchIndexItem[];

export type Index = {
  index: AsPlainObject;
};

let globalIndex: MiniSearch | null = null;
const INDEX_OPTIONS: Options = {
  fields: ["k"],
  storeFields: ["v"],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
};

export async function getSearchIndex(): Promise<Index> {
  const index = (await loadJSON("search.json")) as SearchIndex;
  const minisearchIndex = new MiniSearch(INDEX_OPTIONS);
  await minisearchIndex.addAllAsync(index);
  const searchIndex = JSON.parse(JSON.stringify(minisearchIndex));
  return { index: searchIndex };
}

export function search(index: Index, q: string): SearchResultList {
  if (globalIndex === null) {
    globalIndex = MiniSearch.loadJS(index.index, INDEX_OPTIONS);
  }
  const results = globalIndex.search(q).slice(0, 30);
  return {
    results: results.map((result) => result.v),
  };
}
