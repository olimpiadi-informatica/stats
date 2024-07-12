import type { StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardBody } from "@olinfo/react-components";

import { TaskImage } from "~/components/task";
import type { TaskStat } from "~/lib/stats";
import { round } from "~/lib/utils";

export function TaskStatCard({ stat }: { stat: TaskStat }) {
  if ("task_with_lowest_avg_score" in stat) {
    const task = stat.task_with_lowest_avg_score;
    return (
      <BaseTaskStatCard task={task}>
        <div>
          <Link href={`/task/${task.contest_year}/${task.name}`} className="link">
            {task.title}
          </Link>{" "}
          è il problema con il punteggio medio più basso, {round(task.avg_score)} su{" "}
          {task.max_score_possible}.
        </div>
      </BaseTaskStatCard>
    );
  }

  if ("task_with_highest_avg_score" in stat) {
    const task = stat.task_with_highest_avg_score;
    return (
      <BaseTaskStatCard task={task}>
        <div>
          <Link href={`/task/${task.contest_year}/${task.name}`} className="link">
            {task.title}
          </Link>{" "}
          è il problema con il punteggio medio più alto, {round(task.avg_score)} su{" "}
          {task.max_score_possible}.
        </div>
      </BaseTaskStatCard>
    );
  }

  if ("task_with_lowest_max_score" in stat) {
    const task = stat.task_with_lowest_max_score;
    return (
      <BaseTaskStatCard task={task}>
        <div>
          <Link href={`/task/${task.contest_year}/${task.name}`} className="link">
            {task.title}
          </Link>{" "}
          è uno dei problemi più difficili, il punteggio più alto totalizzato è stato{" "}
          {round(task.max_score)} su {task.max_score_possible}.
        </div>
      </BaseTaskStatCard>
    );
  }

  if ("task_with_most_zeros" in stat) {
    const task = stat.task_with_most_zeros;
    return (
      <BaseTaskStatCard task={task}>
        <div>
          <Link href={`/task/${task.contest_year}/${task.name}`} className="link">
            {task.title}
          </Link>{" "}
          è uno dei problemi più impegnativi, {task.num_zeros} partecipanti su{" "}
          {task.num_participants} hanno fatto zero punti.
        </div>
      </BaseTaskStatCard>
    );
  }

  if ("task_with_most_fullscores" in stat) {
    const task = stat.task_with_most_fullscores;
    return (
      <BaseTaskStatCard task={task}>
        <div>
          <Link href={`/task/${task.contest_year}/${task.name}`} className="link">
            {task.title}
          </Link>{" "}
          è uno dei problemi più semplici, {task.num_fullscores} partecipanti su{" "}
          {task.num_participants} hanno fatto il punteggio massimo.
        </div>
      </BaseTaskStatCard>
    );
  }
}

function BaseTaskStatCard({
  task: { contest_year, name, title, image },
  children,
}: {
  task: { contest_year: number; name: string; title: string; image: StaticImageData | null };
  children: ReactNode;
}) {
  return (
    <Card className="!flex-col">
      {image && (
        <TaskImage
          name={name}
          year={contest_year}
          image={image}
          className="mx-auto mt-4 w-52 *:rounded-box"
        />
      )}
      <CardBody title={title}>{children}</CardBody>
    </Card>
  );
}
