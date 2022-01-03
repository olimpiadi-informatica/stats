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
import { International } from "components/international/international";

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

export function Results({ results }: { results: RegionResults }) {
  let numCols = 0;
  for (const result of results.results) {
    for (const contestant of result.contestants) {
      numCols = Math.max(numCols, contestant.task_scores.length);
    }
  }

  const computeScore = (scores: RegionResultsYearContestantTask[]) => {
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
            <th>Contestant</th>
            <th>Rank</th>
            <th>Score</th>
            <th className={styles.medal}>Medal</th>
            <th colSpan={numCols}>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {results.results.flatMap((result) =>
            result.contestants.map((cont) => (
              <tr key={`${result.year} ${cont.contestant.id}`}>
                <td>
                  <Link href={`/contest/${result.year}`}>
                    <a>{result.year}</a>
                  </Link>
                </td>
                <td>
                  <Link href={`/contestant/${cont.contestant.id}`}>
                    <a>
                      {cont.contestant.first_name} {cont.contestant.last_name}
                    </a>
                  </Link>
                  {cont.internationals.map((int) => (
                    <International key={int.code} international={int} />
                  ))}
                </td>
                <td>{cont.rank ?? "?"}</td>
                <td>{computeScore(cont.task_scores) ?? "?"}</td>
                <td className={styles.medal}>
                  {cont.medal ? <MedalIcon color={cont.medal} /> : null}
                </td>
                <Scores
                  year={result.year}
                  scores={cont.task_scores}
                  numTasks={numCols}
                />
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
