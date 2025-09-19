import { eq, type SQL, sql, sum } from "drizzle-orm";

import { type Medal, participations } from "./db/schema";

export function getMedalsQuery(defaultValue: 0 | null = 0): SQL.Aliased<Record<Medal, number>> {
  return sql`JSON_OBJECT(
    'gold', COALESCE(${sum(eq(participations.medal, "gold"))}, ${defaultValue}),
    'silver', COALESCE(${sum(eq(participations.medal, "silver"))}, ${defaultValue}),
    'bronze', COALESCE(${sum(eq(participations.medal, "bronze"))}, ${defaultValue})
    )`
    .mapWith(JSON.parse)
    .as("medals");
}
