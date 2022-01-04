import { ContestantDetail } from "lib/remote/user";
import styles from "./contestant.module.scss";
import commonStyles from "styles/common.module.scss";
import { Medals } from "components/medals/medals";
import { ContestantInfo } from "./contestantInfo";
import { ContestantResults } from "./results";
import { ContestantImage } from "./contestantImage";

export function Contestant({ contestant }: { contestant: ContestantDetail }) {
  const medals = { gold: 0, silver: 0, bronze: 0 };
  for (const part of contestant.participations) {
    if (part.medal) {
      medals[part.medal] += 1;
    }
  }

  return (
    <div className={styles.layout}>
      <h1 className={`${styles.title} ${commonStyles.pageHeader}`}>
        {contestant.contestant.first_name} {contestant.contestant.last_name}
      </h1>
      <div className={styles.image}>
        <ContestantImage contestant={contestant.contestant} />
      </div>
      <div className={styles.info}>
        <ContestantInfo contestant={contestant} />
      </div>
      <div className={styles.medals}>
        <Medals medals={medals} />
      </div>
      <div className={styles.results}>
        <h2 className={commonStyles.h2}>Results</h2>
        <ContestantResults contestant={contestant} />
      </div>
    </div>
  );
}
