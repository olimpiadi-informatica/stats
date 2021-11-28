import { MedalIcon } from "components/medals/medalIcon";
import {
  ContestDetail,
  ContestDetailTask,
  ContestResults,
} from "lib/remote/contest";
import Link from "next/link";
import styles from "./results.module.scss";
import { ScoreBadge } from "./scoreBadge";
import { Table } from "react-bootstrap";
import { round } from "lib/round";

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
  // FIXME: sort users by rank
  return (
    <div className={styles.wrapper}>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Contestant</th>
            <th>Score</th>
            <th colSpan={results.tasks.length}>Tasks</th>
            <th className={styles.medal}>Medal</th>
            <th className={styles.region}>Region</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
