import { TaskDetail } from "lib/remote/task";
import {
  RegionDetail,
  RegionResults,
  RegionResultsYearContestantTask,
} from "lib/remote/region";
import { ContestantParticipationScore } from "lib/remote/user";
import styles from "components/results/results.module.scss";
import { Badge, Table } from "react-bootstrap";
import Link from "next/link";
import { round } from "lib/round";
import { MedalIcon } from "components/medals/medalIcon";
import { ScoreBadge } from "components/results/scoreBadge";

type ScoresProps = {
  year: number;
  scores: RegionResultsYearContestantTask[];
  numTasks: number;
};

function Scores({ year, scores, numTasks }: ScoresProps) {
  const padding = [];
  for (let i = 0; i < numTasks - scores.length; i++)
    padding.push(<td key={i} />);

  return (
    <>
      {scores.map((score) => (
        <td key={score.name}>
          <ScoreBadge
            score={score.score}
            year={year}
            task={score.name}
            maxScore={score.max_score_possible}
          />
        </td>
      ))}
      {padding}
    </>
  );
}

export function Results({ task }: { task: TaskDetail }) {
  return (
    <div className={`container ${styles.wrapper}`}>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Contestant</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {task.scores.map((cont) => (
            <tr key={cont.contestant.id}>
              <td>{cont.rank ?? "?"}</td>
              <td>
                <Link href={`/contestant/${cont.contestant.id}`}>
                  <a>
                    {cont.contestant.first_name} {cont.contestant.last_name}
                  </a>
                </Link>
                {cont.ioi && (
                  <>
                    {" "}
                    <Badge pill bg="success">
                      IOI
                    </Badge>
                  </>
                )}
              </td>
              <td>{round(cont.score, 2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
