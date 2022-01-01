import { ContestDetail, ContestResults } from "lib/remote/contest";
import styles from "./contest.module.scss";
import commonStyles from "styles/common.module.scss";
import { ContestInfo } from "./contestInfo";
import { Medals } from "components/medals/medals";
import { TasksList } from "components/tasksList/tasksList";
import { Results } from "components/results/results";
import { useState } from "react";
import Link from "next/link";

type Props = {
  contest: ContestDetail;
  results: ContestResults;
  year: number;
};

export function Contest({ contest, year, results }: Props) {
  const [imgOk, setImgOk] = useState<boolean>(true);

  return (
    <div className={styles.contest}>
      <div className={`${styles.title} ${commonStyles.navigation}`}>
        <h1 className={commonStyles.pageHeader}>
          {contest.location.location} {year}
        </h1>
        <div className={commonStyles.previous}>
          {results.navigation.previous !== null && (
            <Link href={`/contest/${results.navigation.previous}`}>
              <a>← {results.navigation.previous}</a>
            </Link>
          )}
        </div>
        <div className={commonStyles.next}>
          {results.navigation.next !== null && (
            <Link href={`/contest/${results.navigation.next}`}>
              <a>{results.navigation.next} →</a>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.logo}>
        {imgOk && (
          <img
            src={`/static/contests/${year}.jpg`}
            alt={`Contest ${year}`}
            onError={() => setImgOk(false)}
          />
        )}
      </div>
      <div className={styles.info}>
        <ContestInfo contest={contest} />
      </div>
      <div className={styles.medals}>
        <Medals contest={contest} showCutoffs />
      </div>
      <div className={styles.tasks}>
        <h2 className={commonStyles.h2}>Tasks</h2>
        <TasksList tasks={contest.tasks} />
      </div>
      <div className={styles.results}>
        <h2 className={commonStyles.h2}>Results</h2>
        <Results contest={contest} results={results} />
      </div>
    </div>
  );
}
