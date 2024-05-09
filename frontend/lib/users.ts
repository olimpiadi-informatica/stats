import { readFile } from "node:fs/promises";

import { z } from "zod";

import { contestantSchema, internationalSchema, medalSchema, medalsSchema } from "./common";
import { getUserImage } from "./user";

const participationSchema = z
  .object({
    year: z.number(),
    internationals: internationalSchema.array(),
    medal: medalSchema,
  })
  .strict();

export const userSchema = z
  .object({
    contestant: contestantSchema,
    num_medals: medalsSchema,
    best_rank: z.number().nullable(),
    participations: participationSchema.array(),
  })
  .strict()
  .transform(async (user) => ({ ...user, image: await getUserImage(user.contestant.id) }));

const usersSchema = z.object({ users: userSchema.array() }).strict();

export type Users = z.infer<typeof usersSchema>["users"];

export async function getUsers(): Promise<Users> {
  const { users } = await usersSchema.parseAsync(
    JSON.parse(await readFile("../data/users.json", "utf8")),
  );
  return users;
}
