import { ContestDetail, ContestResults } from "lib/remote/contest";
import styles from "./contest.module.scss";
import commonStyles from "styles/common.module.scss";
import { ContestInfo } from "./contestInfo";
import { Medals } from "components/medals/medals";
import { TasksList } from "components/tasksList/tasksList";
import { Results } from "components/results/results";
import { Navigation } from "components/navigation/navigation";
import { ContestImage } from "./contestImage";

type Props = {
  contest: ContestDetail;
  results: ContestResults;
  year: number;
};

export function Contest({ contest, year, results }: Props) {
  return (
    <div className={styles.contest}>
      <div className={styles.title}>
        <Navigation
          navigation={results.navigation}
          title={`${contest.location.location} ${year}`}
          genLink={(year) => `/contest/${year}`}
        />
      </div>
      <div className={styles.logo}>
        <ContestImage year={year} />
      </div>
      <div className={styles.info}>
        <ContestInfo contest={contest} />
      </div>
      <div className={styles.medals}>
        <Medals contest={contest} showCutoffs />
      </div>
      {contest.tasks.length > 0 && (
        <>
          <div className={styles.tasks}>
            <h2 className={commonStyles.h2}>Tasks</h2>
            <TasksList tasks={contest.tasks} />
          </div>
        </>
      )}
      <div className={styles.results}>
        <h2 className={commonStyles.h2}>Results</h2>
        <Results contest={contest} results={results} />
      </div>
    </div>
  );
}
