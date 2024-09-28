import clsx from "clsx";

import { round } from "~/lib/utils";

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
      className={clsx("block rounded-box text-black border border-black/10", className, {
        "font-bold": percent === 100,
        "bg-emerald-600": percent > 90,
        "bg-emerald-500": percent > 75 && percent <= 90,
        "bg-emerald-400": percent > 60 && percent <= 75,
        "bg-emerald-300": percent > 45 && percent <= 60,
        "bg-emerald-200": percent > 30 && percent <= 45,
        "bg-emerald-100": percent > 15 && percent <= 30,
        "bg-emerald-50": percent <= 15,
      })}>
      {round(score)}
    </span>
  );
}
