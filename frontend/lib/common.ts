import { ZodTypeAny, z } from "zod";

export const baseTaskSchema = z
  .object({
    contest_year: z.number(),
    name: z.string(),
    title: z.string(),
    link: z.string().nullable(),
    index: z.number(),
    max_score_possible: z.number().nullable(),
  })
  .strict();

export const contestantSchema = z
  .object({
    id: z.string(),
    username: z.string().nullable(),
    first_name: z.string().nullable(),
    last_name: z.string(),
  })
  .strict();

export type Contestant = z.infer<typeof contestantSchema>;

export const internationalSchema = z
  .object({
    code: z.string(),
    name: z.string(),
    link: z.string().nullable(),
    color: z.string(),
  })
  .strict();

export type International = z.infer<typeof internationalSchema>;

export const locationSchema = z
  .object({
    location: z.string().nullable(),
    gmaps: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
  })
  .strict();

export const medalSchema = z.enum(["gold", "silver", "bronze"]).nullable();

export const medalsSchema = z
  .object({
    gold: z.number(),
    silver: z.number(),
    bronze: z.number(),
  })
  .strict();

export function navigationSchema<T extends ZodTypeAny>(schema: T) {
  return z
    .object({
      current: schema,
      previous: schema.nullable(),
      next: schema.nullable(),
    })
    .strict();
}
