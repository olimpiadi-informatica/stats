import { TaskDetail } from "lib/remote/task";
import styles from "./task.module.scss";
import commonStyles from "styles/common.module.scss";
import { useState } from "react";
import { TaskInfo } from "./taskInfo";
import { Results } from "./results";
import { Navigation } from "components/navigation/navigation";

export function Task({ task }: { task: TaskDetail }) {
  const [imgOk, setImgOk] = useState<boolean>(true);

  return (
    <div className={styles.contest}>
      <div className={styles.title}>
        <Navigation
          navigation={task.navigation}
          title={task.title}
          genLink={(task) => `/task/${task.year}/${task.name}`}
          genTitle={(task) => task.name}
        />
      </div>
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
