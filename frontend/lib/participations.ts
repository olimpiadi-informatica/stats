import { cache } from "react";

import { and, desc, eq, isNull } from "drizzle-orm";

import { db } from "./db";
import { type Medal, participations, users } from "./db/schema";

export type Participation = {
  userId: string;
  firstName: string | null;
  lastName: string;
  year: number;
  rank: number | null;
  region: string | null;
  medal: Medal | null;
  internationals: string | null;
  score: number | null;
};

function getParticipationQuery() {
  return db
    .select({
      userId: participations.userId,
      firstName: users.firstName,
      lastName: users.lastName,
      year: participations.contestYear,
      rank: participations.rank,
      region: participations.regionId,
      medal: participations.medal,
      internationals: participations.internationals,
      score: participations.score,
    })
    .from(participations)
    .innerJoin(users, eq(users.id, participations.userId));
}

export const getContestParticipations = cache(
  (year: number, regionId?: string): Promise<Participation[]> => {
    return getParticipationQuery()
      .where(
        and(
          eq(participations.contestYear, year),
          eq(participations.regionId, regionId ?? "").if(regionId),
        ),
      )
      .orderBy(
        isNull(participations.rank),
        participations.rank,
        users.firstName,
        users.lastName,
        users.id,
      );
  },
);

export const getUserParticipations = cache((userId: string): Promise<Participation[]> => {
  return getParticipationQuery()
    .where(eq(participations.userId, userId))
    .orderBy(desc(participations.contestYear));
});
