import { type SQL, sql } from "drizzle-orm";

import { type Medal, participations } from "./db/schema";

export function getMedalsQuery(
  defaultValue: 0 | null = 0,
  includeOnline = false,
): SQL.Aliased<Record<Medal, number>> {
  const typeCondition = includeOnline
    ? sql`${participations.type} IN ('official', 'online')`
    : sql`${participations.type} = 'official'`;

  return sql`JSON_OBJECT(
    'gold', COALESCE(SUM(CASE WHEN ${typeCondition} AND ${participations.medal} = 'gold' THEN 1 END), ${defaultValue}),
    'silver', COALESCE(SUM(CASE WHEN ${typeCondition} AND ${participations.medal} = 'silver' THEN 1 END), ${defaultValue}),
    'bronze', COALESCE(SUM(CASE WHEN ${typeCondition} AND ${participations.medal} = 'bronze' THEN 1 END), ${defaultValue}),
    'honorable', COALESCE(SUM(CASE WHEN ${typeCondition} AND ${participations.medal} = 'honorable' THEN 1 END), ${defaultValue})
    )`
    .mapWith(JSON.parse)
    .as("medals");
}
