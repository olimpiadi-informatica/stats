import { integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const regions = sqliteTable("regions", {
  id: text().primaryKey(),
  name: text().notNull(),
});

export const users = sqliteTable("users", {
  id: text().primaryKey(),
  firstName: text("name"),
  lastName: text("surname").notNull(),
  username: text(),
});

export const contests = sqliteTable("contests", {
  year: integer().primaryKey(),
  location: text(),
  regionId: text("region"),
  gmaps: text(),
  latitude: real(),
  longitude: real(),
});

export const tasks = sqliteTable("tasks", {
  name: text().primaryKey(),
  contestYear: integer("contest_year")
    .notNull()
    .references(() => contests.year),
  idx: integer(),
  maxScorePossible: real("max_score_possible"),
  title: text(),
  link: text(),
});

export type Medal = "gold" | "silver" | "bronze";

export const participations = sqliteTable(
  "participations",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    contestYear: integer("contest_year")
      .notNull()
      .references(() => contests.year),
    rank: integer(),
    school: text(),
    regionId: text("region_id").references(() => regions.id),
    medal: text().$type<Medal>(),
    internationals: text(),
    score: real(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.contestYear],
      name: "participations_user_id_contest_year_pk",
    }),
  ],
);

export const taskScores = sqliteTable(
  "task_scores",
  {
    taskName: text("task_name")
      .notNull()
      .references(() => tasks.name),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    contestYear: integer("contest_year")
      .notNull()
      .references(() => contests.year),
    score: real(),
  },
  (table) => [
    primaryKey({
      columns: [table.taskName, table.userId, table.contestYear],
      name: "task_scores_task_name_user_id_contest_year_pk",
    }),
  ],
);

export const internationals = sqliteTable("internationals", {
  code: text().primaryKey(),
  name: text().notNull(),
  link: text(),
  color: text(),
});
