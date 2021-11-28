/* eslint-disable @next/next/no-img-element */
import { TaskInfo } from "components/task/taskInfo";
import { ContestInfoTask } from "lib/remote/contest";
import Link from "next/link";
import { useState } from "react";
import styles from "./tasksListItem.module.scss";

type Props = {
  task: ContestInfoTask;
};

export function TasksListItem({ task }: Props) {
  const [imgOk, setImgOk] = useState<boolean>(true);
  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <Link href={`/task/${task.contest_year}/${task.name}`}>
          {task.title}
        </Link>
      </div>
      {imgOk && (
        <div className={styles.image}>
          <Link href={`/task/${task.contest_year}/${task.name}`}>
            <a>
              <img
                src={`/static/tasks/${task.contest_year}/${task.name}.png`}
                alt={`${task.name} ${task.contest_year}`}
                onError={() => setImgOk(false)}
              />
            </a>
          </Link>
        </div>
      )}
      <div className={styles.info}>
        <TaskInfo task={task} />
      </div>
    </div>
  );
}
