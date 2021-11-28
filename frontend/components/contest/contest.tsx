/* eslint-disable @next/next/no-img-element */
import { ContestDetail, ContestResults } from "lib/remote/contest";
import styles from "./contest.module.scss";
import commonStyles from "styles/common.module.scss";
import { ContestInfo } from "./contestInfo";
import { Medals } from "components/medals/medals";
import { TasksList } from "components/tasksList/tasksList";
import { Results } from "components/results/results";
import { useState } from "react";

type Props = {
  contest: ContestDetail;
  results: ContestResults;
  year: number;
};

export function Contest({ contest, year, results }: Props) {
  const [imgOk, setImgOk] = useState<boolean>(true);

  const medals = {
    gold: contest.medals.gold.number,
    silver: contest.medals.silver.number,
    bronze: contest.medals.bronze.number,
  };
  const cutoffs = {
    gold: contest.medals.gold.cutoff,
    silver: contest.medals.silver.cutoff,
    bronze: contest.medals.bronze.cutoff,
  };
  return (
    <div className={styles.contest}>
      <h1 className={`${commonStyles.pageHeader} ${styles.title}`}>
        {contest.location.location} {year}
      </h1>
      <div className={styles.logo}>
        {imgOk && (
          <img
            src={`/static/contests/${year}.jpg`}
            alt={`Contest ${year}`}
            onError={(event: any) => {
              setImgOk(false);
            }}
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
