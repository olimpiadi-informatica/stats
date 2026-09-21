import type { ReactNode } from "react";

import clsx from "clsx";
import { Award, MedalIcon } from "lucide-react";

type MedalsProps = {
  gold: ReactNode;
  silver: ReactNode;
  bronze: ReactNode;
  honorable: ReactNode;
  showHonorable: boolean;
};

export function Medals({ gold, silver, bronze, honorable, showHonorable }: MedalsProps) {
  return (
    <div className="flex justify-center gap-4">
      <Medal type="gold">{gold}</Medal>
      <Medal type="silver">{silver}</Medal>
      <Medal type="bronze">{bronze}</Medal>
      {showHonorable && <Medal type="honorable">{honorable}</Medal>}
    </div>
  );
}

export function hasHonorableEligibility(user: { participations: string }) {
  return user.participations.split(", ").some((y) => Number(y) >= 2025);
}

type MedalProps = {
  type: "gold" | "silver" | "bronze" | "honorable" | null;
  children: ReactNode;
};

export function Medal({ type, children }: MedalProps) {
  return (
    <span>
      {type === "honorable" ? (
        <Award className="inline-block stroke-indigo-400" />
      ) : (
        <MedalIcon className={clsx("inline-block last:*:hidden", color(type))} />
      )}
      <span className="mx-1.5 inline-block">{children ?? "N/A"}</span>
    </span>
  );
}

function color(type: string | null) {
  switch (type) {
    case "gold":
      return "stroke-amber-400";
    case "silver":
      return "stroke-gray-400";
    case "bronze":
      return "stroke-amber-600";
    default:
      return "hidden";
  }
}
