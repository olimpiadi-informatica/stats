import { readFile } from "node:fs/promises";

import { z } from "zod";

import { contestSchema } from "./contests";
import { regionSchema } from "./regions";
import { taskSchema } from "./tasks";
import { userSchema } from "./users";

const taskResultSchema = z.object({ task: taskSchema, year: z.number() }).strict();

const searchResultSchema = z
  .object({
    id: z.string(),
    k: z.string(),
    v: z.union([
      z.object({ contest: contestSchema }).strict(),
      z.object({ region: regionSchema }).strict(),
      z.object({ task: taskResultSchema }).strict(),
      z.object({ user: userSchema }).strict(),
    ]),
  })
  .strict();

export type SearchResult = z.infer<typeof searchResultSchema>;
export type SearchResultValue = SearchResult["v"];

const searchSchema = searchResultSchema.array();

export async function getSearchResults(): Promise<SearchResult[]> {
  return searchSchema.parseAsync(JSON.parse(await readFile("../data/search.json", "utf8")));
}
