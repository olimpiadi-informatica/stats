import { PageClient } from "~/app/(home)/page-client";
import { getStats } from "~/lib/stats";

import { ContestStatCard } from "./contest";
import { RegionStatCard } from "./region";
import { TaskStatCard } from "./task";
import { UserStatCard } from "./user";

export default async function Page() {
  const stats = await getStats();

  const regions = stats.region.map((stat, i) => <RegionStatCard key={`region-${i}`} stat={stat} />);
  const users = stats.user.map((stat, i) => <UserStatCard key={`user-${i}`} stat={stat} />);
  const tasks = stats.task.map((stat, i) => <TaskStatCard key={`task-${i}`} stat={stat} />);
  const contests = stats.contest.map((stat, i) => (
    <ContestStatCard key={`contest-${i}`} stat={stat} />
  ));

  return <PageClient regions={regions} users={users} tasks={tasks} contests={contests} />;
}
