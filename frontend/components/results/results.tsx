import { MedalIcon } from "components/medals/medalIcon";
import {
  ContestDetail,
  ContestDetailTask,
  ContestResults,
} from "lib/remote/contest";
import Link from "next/link";
import styles from "./results.module.scss";
import { ScoreBadge } from "./scoreBadge";
import { Badge, Table } from "react-bootstrap";
import { round } from "lib/round";
import { International } from "components/international/international";

type ScoresProps = {
  scores: (number | null)[];
  year: number;
  tasks: ContestDetailTask[];
};

function Scores({ scores, year, tasks }: ScoresProps) {
  return (
    <>
      {tasks.map((task, index) => (
        <td key={task.name}>
          <ScoreBadge
            score={scores[index]}
            year={year}
            task={task.name}
            maxScore={task.max_score_possible}
          />
        </td>
      ))}
    </>
  );
}

type Props = {
  contest: ContestDetail;
  results: ContestResults;
};

export function Results({ results, contest }: Props) {
  return (
    <div className={`container ${styles.wrapper}`}>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Contestant</th>
            <th>Score</th>
            <th colSpan={results.tasks.length}>Tasks</th>
            <th className={styles.medal}>Medal</th>
            <th className={styles.region}>Region</th>
            <th>Past Years</th>
          </tr>
        </thead>
        <tbody>
          {results.results.map((user) => (
            <tr key={user.contestant.id}>
              <td>{user.rank}</td>
              <td>
                <Link href={`/contestant/${user.contestant.id}`}>
                  <a>
                    {user.contestant.first_name} {user.contestant.last_name}
                  </a>
                </Link>
                {user.internationals.map((int) => (
                  <International key={int.code} international={int} />
                ))}
              </td>
              <td>{user.score === null ? "?" : round(user.score, 2)}</td>
              <Scores
                year={results.navigation.current}
                scores={user.scores}
                tasks={contest.tasks}
              />
              <td className={styles.medal}>
                {user.medal ? <MedalIcon color={user.medal} /> : null}
              </td>
              <td className={styles.region}>
                {user.region ? (
                  <Link href={`/region/${user.region}`}>{user.region}</Link>
                ) : null}
              </td>
              <td>
                {user.past_participations.map((past) => (
                  <div key={past.year}>
                    <Link href={`/contest/${past.year}`}>
                      <a>{past.year}</a>
                    </Link>
                    {past.medal && (
                      <MedalIcon
                        color={past.medal}
                        size={20}
                        className={styles.pastMedal}
                      />
                    )}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
