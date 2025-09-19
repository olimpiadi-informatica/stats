import type { StaticImageData } from "next/image";
import { cache } from "react";

import { and, count, eq, isNull, notExists } from "drizzle-orm";

import { getMedalsQuery } from "./common";
import { db } from "./db";
import { contests, type Medal, participations, regions } from "./db/schema";
import { withImage } from "./image";

export type Region = {
  id: string;
  name: string;
  numContestants: number;
  numYears: number;
  medals: Record<Medal, number>;
  image: StaticImageData | null;
};

function getRegionQuery() {
  return db
    .select({
      id: regions.id,
      name: regions.name,
      numContestants: count(),
      numYears: db.$count(
        contests,
        notExists(
          db
            .select()
            .from(participations)
            .where(
              and(eq(participations.contestYear, contests.year), isNull(participations.regionId)),
            ),
        ),
      ),
      medals: getMedalsQuery(),
    })
    .from(regions)
    .leftJoin(participations, eq(participations.regionId, regions.id))
    .groupBy(regions.id, regions.name);
}

export const getRegion = cache(async (id: string): Promise<Region> => {
  const [region] = await withImage(getRegionQuery().where(eq(regions.id, id)), importImage);
  if (!region) throw new Error(`Region ${id} not found`);
  return region;
});

export const getRegions = cache((): Promise<Region[]> => {
  return withImage(getRegionQuery().orderBy(regions.name), importImage);
});

function importImage(region: Omit<Region, "image">) {
  return import(`/../static/regions/${region.id}.svg`);
}
