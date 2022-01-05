import { TaskImage } from "components/task/taskImage";
import { TaskInfo } from "components/task/taskInfo";
import { ContestInfoTask } from "lib/remote/contest";
import Link from "next/link";
import styles from "./tasksListItem.module.scss";

type Props = {
  task: ContestInfoTask;
};

export function TasksListItem({ task }: Props) {
  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <Link href={`/task/${task.contest_year}/${task.name}`}>
          {task.title}
        </Link>
      </div>
      <div className={styles.image}>
        <Link href={`/task/${task.contest_year}/${task.name}`}>
          <a>
            <TaskImage contest_year={task.contest_year} name={task.name} />
          </a>
        </Link>
      </div>
      <div className={styles.info}>
        <TaskInfo task={task} />
      </div>
    </div>
  );
}
