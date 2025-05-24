import clsx from "clsx";
import { round } from "lodash-es";

export function Score({
  score,
  maxScore,
  className,
}: {
  score: number | null;
  maxScore: number | null;
  className?: string;
}) {
  if (score === null || maxScore === null) return "N/A";

  const percent = Math.floor((score / maxScore) * 100);

  return (
    <span
      className={clsx(
        "block rounded-box text-black border border-black/10",
        className,
        percent > 99.9 && "font-bold",
      )}
      style={{
        backgroundColor: `color-mix(in srgb, rgb(5 150 105) ${percent}%, rgb(236 253 245))`,
      }}>
      {round(score, 1)}
    </span>
  );
}
