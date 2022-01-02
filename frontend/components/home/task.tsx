import {
  StatsTask,
  TaskWithHighestAvgScore,
  TaskWithLowestAvgScore,
  TaskWithLowestMaxScore,
  TaskWithMostFullscores,
  TaskWithMostZeros,
} from "lib/remote/home";
import { Tile } from "./tile";
import Link from "next/link";
import styles from "./tile.module.scss";
import { round } from "lib/round";

type Task = {
  contest_year: number;
  name: string;
  title: string;
};

function TaskImage({ task }: { task: Task }) {
  return (
    <Link href={`/task/${task.contest_year}/${task.name}`}>
      <a>
        <img
          className={styles.image}
          src={`/static/tasks/${task.contest_year}/${task.name}.png`}
          alt={task.title}
          onError={(event: any) => {
            event.target.style = "display: none";
          }}
        />
      </a>
    </Link>
  );
}

function TaskLink({ task }: { task: Task }) {
  return (
    <Link href={`/task/${task.contest_year}/${task.name}`}>
      <a>{task.title}</a>
    </Link>
  );
}

function TaskWithLowestAvgScoreTile({
  stat,
}: {
  stat: TaskWithLowestAvgScore;
}) {
  const task = stat.task_with_lowest_avg_score;
  return (
    <div>
      <TaskImage task={task} />
      <TaskLink task={task} /> is the task with the lowest average score,{" "}
      {round(task.avg_score, 2)} out of {task.max_score_possible}.
    </div>
  );
}

function TaskWithHighestAvgScoreTile({
  stat,
}: {
  stat: TaskWithHighestAvgScore;
}) {
  const task = stat.task_with_highest_avg_score;
  return (
    <div>
      <TaskImage task={task} />
      <TaskLink task={task} /> is the task with the highest average score,{" "}
      {round(task.avg_score, 2)} out of {task.max_score_possible}.
    </div>
  );
}

function TaskWithLowestMaxScoreTile({
  stat,
}: {
  stat: TaskWithLowestMaxScore;
}) {
  const task = stat.task_with_lowest_max_score;
  return (
    <div>
      <TaskImage task={task} />
      <TaskLink task={task} /> is one of the hardest task of its time, everyone
      scored no more than {round(task.max_score, 2)} out of{" "}
      {task.max_score_possible}.
    </div>
  );
}

function TaskWithMostZerosTile({ stat }: { stat: TaskWithMostZeros }) {
  const task = stat.task_with_most_zeros;
  return (
    <div>
      <TaskImage task={task} />
      <TaskLink task={task} /> is one of the most challenging tasks,{" "}
      {task.num_zeros} out of {task.num_participants} students scored zero
      points.
    </div>
  );
}

function TaskWithMostFullscoresTile({
  stat,
}: {
  stat: TaskWithMostFullscores;
}) {
  const task = stat.task_with_most_fullscores;
  return (
    <div>
      <TaskImage task={task} />
      <TaskLink task={task} /> is one of the easiest tasks,{" "}
      {task.num_fullscores} out of {task.num_participants} students had full
      score.
    </div>
  );
}

export function TaskTile({ stat }: { stat: StatsTask }) {
  let content = null;
  if ("task_with_lowest_avg_score" in stat) {
    content = <TaskWithLowestAvgScoreTile stat={stat} />;
  }
  if ("task_with_highest_avg_score" in stat) {
    content = <TaskWithHighestAvgScoreTile stat={stat} />;
  }
  if ("task_with_lowest_max_score" in stat) {
    content = <TaskWithLowestMaxScoreTile stat={stat} />;
  }
  if ("task_with_most_zeros" in stat) {
    content = <TaskWithMostZerosTile stat={stat} />;
  }
  if ("task_with_most_fullscores" in stat) {
    content = <TaskWithMostFullscoresTile stat={stat} />;
  }

  return <Tile variant="task">{content}</Tile>;
}
