import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardBody } from "@olinfo/react-components";
import { round } from "lodash-es";

import { TaskImage } from "~/components/card/task";
import type { TaskStat } from "~/lib/stats";
import { type Task, getTask } from "~/lib/tasks";

export async function TaskStatCard({ stat }: { stat: TaskStat }) {
  switch (stat.type) {
    case "task_with_lowest_avg_score": {
      const task = await getTask(stat.contest_year, stat.name);
      return (
        <BaseTaskStatCard task={task}>
          <div>
            <Link href={`/task/${task.contestYear}/${task.name}`} className="link">
              {task.title}
            </Link>{" "}
            è il problema con il punteggio medio più basso, {round(stat.avg_score, 1)} su{" "}
            {task.maxScorePossible}.
          </div>
        </BaseTaskStatCard>
      );
    }

    case "task_with_highest_avg_score": {
      const task = await getTask(stat.contest_year, stat.name);
      return (
        <BaseTaskStatCard task={task}>
          <div>
            <Link href={`/task/${task.contestYear}/${task.name}`} className="link">
              {task.title}
            </Link>{" "}
            è il problema con il punteggio medio più alto, {round(stat.avg_score, 1)} su{" "}
            {task.maxScorePossible}.
          </div>
        </BaseTaskStatCard>
      );
    }

    case "task_with_lowest_max_score": {
      const task = await getTask(stat.contest_year, stat.name);
      return (
        <BaseTaskStatCard task={task}>
          <div>
            <Link href={`/task/${task.contestYear}/${task.name}`} className="link">
              {task.title}
            </Link>{" "}
            è uno dei problemi più difficili, il punteggio più alto totalizzato è stato{" "}
            {round(task.maxScore!, 1)} su {task.maxScorePossible}.
          </div>
        </BaseTaskStatCard>
      );
    }

    case "task_with_most_zeros": {
      const task = await getTask(stat.contest_year, stat.name);
      return (
        <BaseTaskStatCard task={task}>
          <div>
            <Link href={`/task/${task.contestYear}/${task.name}`} className="link">
              {task.title}
            </Link>{" "}
            è uno dei problemi più impegnativi, {stat.num_zeros} partecipanti su{" "}
            {stat.num_participants} hanno fatto zero punti.
          </div>
        </BaseTaskStatCard>
      );
    }

    case "task_with_most_fullscores": {
      const task = await getTask(stat.contest_year, stat.name);
      return (
        <BaseTaskStatCard task={task}>
          <div>
            <Link href={`/task/${task.contestYear}/${task.name}`} className="link">
              {task.title}
            </Link>{" "}
            è uno dei problemi più semplici, {stat.num_fullscores} partecipanti su{" "}
            {stat.num_participants} hanno fatto il punteggio massimo.
          </div>
        </BaseTaskStatCard>
      );
    }
  }
}

function BaseTaskStatCard({
  task,
  children,
}: {
  task: Task;
  children: ReactNode;
}) {
  return (
    <Card className="!flex-col">
      {task.image && <TaskImage task={task} className="mx-auto mt-4 w-52 *:rounded-box" />}
      <CardBody title={task.title}>{children}</CardBody>
    </Card>
  );
}
