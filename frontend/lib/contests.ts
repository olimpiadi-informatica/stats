import type { StaticImageData } from "next/image";
import { cache } from "react";

import { avg, count, desc, eq, max } from "drizzle-orm";

import { getMedalsQuery } from "./common";
import { db } from "./db";
import { type Medal, contests, participations } from "./db/schema";
import { withImage } from "./image";

export type Contest = {
  year: number;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  maxScore: number | null;
  avgScore: number | null;
  numContestants: number;
  medals: Record<Medal, number>;
  image: StaticImageData | null;
};

function getContestQuery() {
  return db
    .select({
      year: contests.year,
      location: contests.location,
      latitude: contests.latitude,
      longitude: contests.longitude,
      maxScore: max(participations.score),
      avgScore: avg(participations.score).mapWith(Number),
      numContestants: count(),
      medals: getMedalsQuery(null),
    })
    .from(contests)
    .innerJoin(participations, eq(participations.contestYear, contests.year))
    .groupBy(contests.year, contests.location);
}

export const getContest = cache(async (year: number): Promise<Contest> => {
  const [contest] = await withImage(getContestQuery().where(eq(contests.year, year)), importImage);
  if (!contest) throw new Error(`Contest ${year} not found`);
  return contest;
});

export const getContests = cache((): Promise<Contest[]> => {
  return withImage(getContestQuery().orderBy(desc(contests.year)), importImage);
});

function importImage(contest: Omit<Contest, "image">) {
  return import(`/../static/contests/${contest.year}.jpg?w=176`);
}
