import { type ZodRawShape, z } from "zod";

import { contestantSchema, medalsSchema } from "~/lib/common";
import { getUserImage } from "~/lib/user";

function userSchema<T extends ZodRawShape>(schema: T) {
  return z
    .object({ contestant: contestantSchema })
    .extend(schema)
    .strict()
    .transform(async (user) => ({
      ...user,
      image: await getUserImage(user.contestant?.id as string),
    }));
}

const bestStudentSchema = userSchema({
  num_medals: medalsSchema,
});

const winAtFirstParticipationSchema = userSchema({
  year: z.number(),
});

const ioistWithWorstRankSchema = userSchema({
  contest_year: z.number(),
  rank: z.number(),
});

export const userStatSchema = z.union([
  z.object({ best_student: bestStudentSchema }).strict(),
  z.object({ win_at_first_participation: winAtFirstParticipationSchema }).strict(),
  z.object({ ioist_with_worst_rank: ioistWithWorstRankSchema }).strict(),
]);

export type UserStat = z.infer<typeof userStatSchema>;
