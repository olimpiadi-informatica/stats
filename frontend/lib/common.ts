import { type SQL, sql } from "drizzle-orm";

import { type Medal, participations } from "./db/schema";

export function getMedalsQuery(defaultValue: 0 | null = 0): SQL.Aliased<Record<Medal, number>> {
  return sql`JSON_OBJECT(
    'gold', COALESCE(SUM(CASE WHEN ${participations.type} = 'official' AND ${participations.medal} = 'gold' THEN 1 END), ${defaultValue}),
    'silver', COALESCE(SUM(CASE WHEN ${participations.type} = 'official' AND ${participations.medal} = 'silver' THEN 1 END), ${defaultValue}),
    'bronze', COALESCE(SUM(CASE WHEN ${participations.type} = 'official' AND ${participations.medal} = 'bronze' THEN 1 END), ${defaultValue}),
    'honorable', COALESCE(SUM(CASE WHEN ${participations.type} = 'official' AND ${participations.medal} = 'honorable' THEN 1 END), ${defaultValue})
    )`
    .mapWith(JSON.parse)
    .as("medals");
}
