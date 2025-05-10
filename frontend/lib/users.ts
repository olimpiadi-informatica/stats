import type { StaticImageData } from "next/image";
import { cache } from "react";

import { desc, eq, min, notLike, sql } from "drizzle-orm";

import { getMedalsQuery } from "./common";
import { db } from "./db";
import { type Medal, participations, users } from "./db/schema";
import { withImage } from "./image";

export type User = {
  id: string;
  firstName: string | null;
  lastName: string;
  username: string | null;
  bestRank: number | null;
  participations: string;
  medals: Record<Medal, number>;
  image: StaticImageData | null;
};

function getUserQuery() {
  return db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      username: users.username,
      bestRank: min(participations.rank),
      participations: sql<string>`GROUP_CONCAT(${participations.contestYear}, ', ' ORDER BY ${participations.contestYear} DESC)`,
      medals: getMedalsQuery(),
    })
    .from(users)
    .innerJoin(participations, eq(participations.userId, users.id))
    .groupBy(users.id, users.firstName, users.lastName, users.id);
}

export const getUser = cache(async (userId: string): Promise<User> => {
  const [user] = await withImage(getUserQuery().where(eq(users.id, userId)), importImage);
  if (!user) throw new Error(`User ${userId} not found`);
  return user;
});

export const getUsers = cache(async (offset: number, limit: number): Promise<User[]> => {
  return withImage(
    getUserQuery()
      .orderBy((user) => [
        desc(sql`${user.medals} -> 'gold'`),
        desc(sql`${user.medals} -> 'silver'`),
        desc(sql`${user.medals} -> 'bronze'`),
        notLike(users.lastName, "Bort%"), // nothing to see here
        user.bestRank,
        desc(user.participations),
        users.firstName,
        users.lastName,
        users.id,
      ])
      .offset(offset)
      .limit(limit),
    importImage,
  );
});

export const getUserIds = cache(async (): Promise<Pick<User, "id">[]> => {
  return db.select({ id: users.id }).from(users);
});

function importImage(user: Omit<User, "image">) {
  return import(`/../static/contestants/${user.id}.jpg?w=208&h=208&fit=outside`);
}
