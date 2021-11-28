/* eslint-disable @next/next/no-img-element */
import { ContestantInfo } from "components/contestant/contestantInfo";
import { Medals } from "components/medals/medals";
import { ContestantItem } from "lib/remote/user";
import Link from "next/link";
import { useState } from "react";
import styles from "./contestantListItem.module.scss";

export function ContestantListItem({ user }: { user: ContestantItem }) {
  const [imgOk, setImgOk] = useState<boolean>(true);
  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <Link href={`/contestant/${user.contestant.id}`}>
          <a>
            {user.contestant.first_name} {user.contestant.last_name}
          </a>
        </Link>
      </div>
      {imgOk && (
        <div className={styles.image}>
          <Link href={`/contestant/${user.contestant.id}`}>
            <a>
              <img
                src={`/static/contestants/${user.contestant.id}.jpg`}
                alt={`${user.contestant.first_name} ${user.contestant.last_name}`}
                onError={() => setImgOk(false)}
              />
            </a>
          </Link>
        </div>
      )}
      <div className={styles.info}>
        <ContestantInfo contestant={user} />
      </div>
      <div className={styles.medals}>
        <Medals medals={user.num_medals} />
      </div>
    </div>
  );
}
