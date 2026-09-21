import { cache } from "react";

import { avg, count, desc, eq, max } from "drizzle-orm";

import { getMedalsQuery } from "./common";
import { db } from "./db";
import { contests, type Medal, participations } from "./db/schema";
import { getImageMetadata, type ImageData, withImage } from "./image";

export type Contest = {
  year: number;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  maxScore: number | null;
  avgScore: number | null;
  numContestants: number;
  medals: Record<Medal, number>;
  image: ImageData | null;
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
  const [contest] = await withImage(
    getContestQuery().where(eq(contests.year, year)),
    getContestImage,
  );
  if (!contest) throw new Error(`Contest ${year} not found`);
  return contest;
});

export const getContests = cache((): Promise<Contest[]> => {
  return withImage(getContestQuery().orderBy(desc(contests.year)), getContestImage);
});

function getContestImage(contest: Omit<Contest, "image">) {
  return getImageMetadata("contests", contest.year.toString());
}
