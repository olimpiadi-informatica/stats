import { ContestItem } from "lib/remote/contest";
import Link from "next/link";
import styles from "./contestListItem.module.scss";
import { Medals } from "components/medals/medals";
import { ContestInfo } from "components/contest/contestInfo";
import { ContestImage } from "components/contest/contestImage";

type Props = {
  contest: ContestItem;
};

export function ContestListItem({ contest }: Props) {
  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <Link href={`/contest/${contest.year}`}>
          <a>
            <h2>
              {contest.location.location} {contest.year}
            </h2>
          </a>
        </Link>
      </div>
      <div className={styles.image}>
        <Link href={`/contest/${contest.year}`}>
          <a>
            <ContestImage year={contest.year} />
          </a>
        </Link>
      </div>
      <div className={styles.info}>
        <ContestInfo contest={contest} />
      </div>
      <div className={styles.medals}>
        <Medals contest={contest} />
      </div>
    </div>
  );
}
