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
        (percent === 100 && "font-bold") ||
          (percent > 90 && "bg-emerald-600") ||
          (percent > 75 && "bg-emerald-500") ||
          (percent > 60 && "bg-emerald-400") ||
          (percent > 45 && "bg-emerald-300") ||
          (percent > 30 && "bg-emerald-200") ||
          (percent > 15 && "bg-emerald-100") ||
          "bg-emerald-50",
      )}>
      {round(score, 1)}
    </span>
  );
}
