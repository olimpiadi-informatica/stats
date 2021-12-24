import { TaskDetail } from "lib/remote/task";
import styles from "./task.module.scss";
import commonStyles from "styles/common.module.scss";
import { useState } from "react";
import { TaskInfo } from "./taskInfo";
import { Results } from "./results";

export function Task({ task }: { task: TaskDetail }) {
  const [imgOk, setImgOk] = useState<boolean>(true);

  return (
    <div className={styles.contest}>
      <h1 className={`${commonStyles.pageHeader} ${styles.title}`}>
        {task.title}
      </h1>
      <div className={styles.logo}>
        {imgOk && (
          <img
            src={`/static/tasks/${task.contest_year}/${task.name}.png`}
            alt={task.name}
            onError={() => setImgOk(false)}
          />
        )}
      </div>
      <div className={styles.info}>
        <TaskInfo task={task} />
      </div>
      <div className={styles.results}>
        <h2 className={commonStyles.h2}>Results</h2>
        <Results task={task} />
      </div>
    </div>
  );
}
