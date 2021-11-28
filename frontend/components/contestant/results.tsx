import {
  ContestantDetail,
  ContestantParticipationScore,
} from "lib/remote/user";
import styles from "components/results/results.module.scss";
import { Badge, Table } from "react-bootstrap";
import Link from "next/link";
import { round } from "lib/round";
import { MedalIcon } from "components/medals/medalIcon";
import { ScoreBadge } from "components/results/scoreBadge";

type ScoresProps = {
  year: number;
  scores: ContestantParticipationScore[];
  numTasks: number;
};

function Scores({ year, scores, numTasks }: ScoresProps) {
  const padding = [];
  for (let i = 0; i < numTasks - scores.length; i++)
    padding.push(<td key={i} />);

  return (
    <>
      {scores.map((score) => (
        <td key={score.task}>
          <ScoreBadge
            score={score.score}
            year={year}
            task={score.task}
            maxScore={score.max_score_possible}
          />
        </td>
      ))}
      {padding}
    </>
  );
}

export function ContestantResults({
  contestant,
}: {
  contestant: ContestantDetail;
}) {
  const numCols = Math.max(
    ...contestant.participations.map((part) => part.scores.length)
  );

  const computeScore = (scores: ContestantParticipationScore[]) => {
    let totalScore = null;
    let maxScore = null;
    for (const score of scores) {
      if (score.score !== null) {
        if (totalScore === null) totalScore = 0;
        totalScore += score.score;
      }
      if (score.max_score_possible !== null) {
        if (maxScore === null) maxScore = 0;
        maxScore += score.max_score_possible;
      }
    }
    if (totalScore === null) return "?";
    if (maxScore === null) return round(totalScore, 2)!.toString();
    return `${round(totalScore, 2)} / ${round(maxScore, 2)}`;
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Rank</th>
            <th>Score</th>
            <th className={styles.medal}>Medal</th>
            <th className={styles.region}>Region</th>
            <th colSpan={numCols}>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {contestant.participations.map((part) => (
            <tr key={part.year}>
              <td>
                <Link href={`/contest/${part.year}`}>
                  <a>{part.year}</a>
                </Link>
                {part.ioi && (
                  <>
                    {" "}
                    <Badge pill bg="success">
                      IOI
                    </Badge>
                  </>
                )}
              </td>
              <td>{part.rank ?? "?"}</td>
              <td>{computeScore(part.scores) ?? "?"}</td>
              <td className={styles.medal}>
                {part.medal ? <MedalIcon color={part.medal} /> : null}
              </td>
              <td className={styles.region}>
                {part.region ? (
                  <Link href={`/region/${part.region}`}>{part.region}</Link>
                ) : null}
              </td>
              <Scores
                year={part.year}
                scores={part.scores}
                numTasks={numCols}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
