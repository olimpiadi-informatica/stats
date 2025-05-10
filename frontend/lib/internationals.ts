import { cache } from "react";

import { eq } from "drizzle-orm";
import { db } from "./db";
import { internationals } from "./db/schema";

export type International = {
  code: string;
  name: string;
  link: string | null;
  color: string | null;
};

export const getInternational = cache(async (code: string): Promise<International> => {
  const [international] = await db
    .select()
    .from(internationals)
    .where(eq(internationals.code, code));
  if (!international) throw new Error(`International ${code} not found`);
  return international;
});
