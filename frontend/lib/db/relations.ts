import { relations } from "drizzle-orm/relations";
import { contests, participations, regions, taskScores, tasks, users } from "./schema";

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  contest: one(contests, {
    fields: [tasks.contestYear],
    references: [contests.year],
  }),
  taskScores: many(taskScores),
}));

export const contestsRelations = relations(contests, ({ many }) => ({
  tasks: many(tasks),
  participations: many(participations),
  taskScores: many(taskScores),
}));

export const participationsRelations = relations(participations, ({ one }) => ({
  region: one(regions, {
    fields: [participations.regionId],
    references: [regions.id],
  }),
  contest: one(contests, {
    fields: [participations.contestYear],
    references: [contests.year],
  }),
  user: one(users, {
    fields: [participations.userId],
    references: [users.id],
  }),
}));

export const regionsRelations = relations(regions, ({ many }) => ({
  participations: many(participations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  participations: many(participations),
  taskScores: many(taskScores),
}));

export const taskScoresRelations = relations(taskScores, ({ one }) => ({
  contest: one(contests, {
    fields: [taskScores.contestYear],
    references: [contests.year],
  }),
  user: one(users, {
    fields: [taskScores.userId],
    references: [users.id],
  }),
  task: one(tasks, {
    fields: [taskScores.taskName],
    references: [tasks.name],
  }),
}));
