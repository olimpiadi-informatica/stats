import { TaskDetail } from "lib/remote/task";
import styles from "./task.module.scss";
import commonStyles from "styles/common.module.scss";
import { TaskInfo } from "./taskInfo";
import { Results } from "./results";
import { Navigation } from "components/navigation/navigation";
import { TaskImage } from "./taskImage";

export function Task({ task }: { task: TaskDetail }) {
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
        <TaskImage contest_year={task.contest_year} name={task.name} />
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
