import { type Contest, getContests } from "./contests";
import { type Region, getRegions } from "./regions";
import { type Task, getTasks } from "./tasks";
import { type User, getUsers } from "./users";

export type SearchResultValue = {
  contest?: Contest;
  region?: Region;
  task?: Task;
  user?: User;
};

export type SearchResult = {
  id: string;
  k: string;
  v: SearchResultValue;
};

export function getContestSearchResults(): Promise<SearchResult[]> {
  return getResults("contest", getContests, ["year"], ["location", "year"]);
}

export function getRegionSearchResults(): Promise<SearchResult[]> {
  return getResults("region", getRegions, ["id"], ["id", "name"]);
}

export function getTaskSearchResults(): Promise<SearchResult[]> {
  return getResults("task", getTasks, ["contestYear", "name"], ["name", "title"]);
}

const CHUNK_SIZE = 200;

export async function* getUserSearchResults(): AsyncGenerator<SearchResult[]> {
  for (let i = 0; ; i += CHUNK_SIZE) {
    const results = await getResults(
      "user",
      () => getUsers(i, CHUNK_SIZE),
      ["id"],
      ["firstName", "lastName", "username"],
    );
    if (results.length === 0) break;
    yield results;
  }
}

async function getResults<
  T extends keyof SearchResultValue,
  V extends NonNullable<SearchResultValue[T]>,
>(
  type: T,
  getValues: () => Promise<V[]>,
  ids: (keyof V)[],
  searchKeys: (keyof V)[],
): Promise<SearchResult[]> {
  const values = await getValues();
  return values.map((v) => ({
    id: [type, ...ids.map((f) => v[f])].join(":"),
    k: searchKeys.map((f) => v[f]).join(" "),
    v: { [type]: v },
  }));
}
