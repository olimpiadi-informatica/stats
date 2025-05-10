import { cache } from "react";

import { and, count, desc, eq, sql } from "drizzle-orm";

import { getMedalsQuery } from "./common";
import { db } from "./db";
import { type Medal, contests, participations } from "./db/schema";

export type RegionContest = {
  year: number;
  location: string | null;
  hosted: boolean;
  numContestants: number;
  numMedalists: number;
  medals: Record<Medal, number>;
};

function getRegionContestQuery(regionId: string) {
  return db
    .select({
      year: contests.year,
      location: contests.location,
      hosted: sql`${eq(contests.regionId, regionId)}`.mapWith(Boolean).as("hosted"),
      numContestants: count(),
      numMedalists: count(participations.medal),
      medals: getMedalsQuery(),
    })
    .from(contests)
    .innerJoin(participations, eq(participations.contestYear, contests.year))
    .groupBy((contest) => [contest.year, contests.location, contest.hosted]);
}

export const getRegionContest = cache(
  async (regionId: string, year: number): Promise<RegionContest> => {
    const [regionContest] = await getRegionContestQuery(regionId).where(
      and(eq(participations.regionId, regionId), eq(contests.year, year)),
    );
    if (!regionContest) throw new Error(`Region contest ${regionId}/${year} not found`);
    return regionContest;
  },
);

export const getRegionContests = cache((regionId: string): Promise<RegionContest[]> => {
  return getRegionContestQuery(regionId)
    .where(eq(participations.regionId, regionId))
    .orderBy(desc(contests.year));
});
