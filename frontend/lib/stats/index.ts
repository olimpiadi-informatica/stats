import { readFile } from "node:fs/promises";

import { z } from "zod";

import { contestStatSchema } from "./contest";
import { regionStatSchema } from "./region";
import { taskStatSchema } from "./task";
import { userStatSchema } from "./user";

const statsSchema = z.object({
  region: regionStatSchema.array(),
  user: userStatSchema.array(),
  task: taskStatSchema.array(),
  contest: contestStatSchema.array(),
});

export async function getStats() {
  return statsSchema.parseAsync(JSON.parse(await readFile("../data/home.json", "utf8")));
}

export type { RegionStat } from "./region";
export type { UserStat } from "./user";
export type { TaskStat } from "./task";
export type { ContestStat } from "./contest";
