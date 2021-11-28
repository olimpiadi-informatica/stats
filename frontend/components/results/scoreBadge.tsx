import { round } from "lib/round";
import Link from "next/link";
import styles from "./scoreBadge.module.scss";

type Props = {
  score: number | null;
  maxScore: number | null;
  year: number;
  task: string;
};

const COLORS = [
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#FFCC00",
  "#41ab5d",
  "#66c2a5",
  "#3288bd",
];
const UNKNOWN_COLOR = "black";

export function ScoreBadge({ score, maxScore, year, task }: Props) {
  const percentage =
    score !== null && maxScore !== null ? score / maxScore : null;
  const color =
    percentage === null
      ? UNKNOWN_COLOR
      : COLORS[Math.round(percentage * (COLORS.length - 1))];

  return (
    <Link href={`/task/${year}/${task}`}>
      <a>
        <span className={styles.score} style={{ color }}>
          {score === null ? "?" : round(score, 2)}
        </span>
        {task}
      </a>
    </Link>
  );
}
