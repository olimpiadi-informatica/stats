import { ContestantDetail } from "lib/remote/user";
import styles from "./contestant.module.scss";
import commonStyles from "styles/common.module.scss";
import { Medals } from "components/medals/medals";
import { useState } from "react";
import { ContestantInfo } from "./contestantInfo";
import { ContestantResults } from "./results";

export function Contestant({ contestant }: { contestant: ContestantDetail }) {
  const [imgOk, setImgOk] = useState<boolean>(true);

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
        {imgOk && (
          <img
            src={`/static/contestants/${contestant.contestant.id}.jpg`}
            alt={`${contestant.contestant.first_name} ${contestant.contestant.last_name}`}
            onError={() => setImgOk(false)}
          />
        )}
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
