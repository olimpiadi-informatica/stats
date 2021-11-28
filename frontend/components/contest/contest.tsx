/* eslint-disable @next/next/no-img-element */
import { ContestDetail } from "lib/remote/contest";
import styles from "./contest.module.scss";
import commonStyles from "styles/common.module.scss";
import { ContestInfo } from "./contestInfo";
import { Medals } from "components/medals/medals";
import { TasksList } from "components/tasksList/tasksList";

type Props = {
  contest: ContestDetail;
  year: number;
};

export function Contest({ contest, year }: Props) {
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
        <img
          src={`/static/contests/${year}.jpg`}
          alt={`Contest ${year}`}
          onError={(event: any) => {
            event.target.style = "display: none";
          }}
        />
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
      <div className={styles.results}></div>
    </div>
  );
}
