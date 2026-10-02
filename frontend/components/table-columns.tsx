import Link from "next/link";

import { round } from "es-toolkit";

import { RegionImage } from "~/components/card/region";
import InternationalBadge from "~/components/international";
import { Medal } from "~/components/medal";
import { Score } from "~/components/score";
import { getUserParticipations, type Participation } from "~/lib/participations";
import { getRegion } from "~/lib/regions";
import { getUserTaskScores } from "~/lib/task-scores";
import type { Task } from "~/lib/tasks";

export function TaskHeaders({ tasks }: { tasks: Task[] }) {
  return tasks.map((task) => (
    <div key={task.name} className="!opacity-100">
      <Link href={`/task/${task.contestYear}/${task.name}`} className="link">
        {task.name}
      </Link>
    </div>
  ));
}

export function ParticipationName({ participation: p }: { participation: Participation }) {
  if (p.type === "online") {
    return (
      <span className="italic">
        <Link href={`/contestant/${p.userId}`} className="link">
          {p.firstName} {p.lastName}
        </Link>
        <abbr
          title="Partecipazione online con proctoring"
          className="cursor-help no-underline ml-1 font-normal not-italic">
          *
        </abbr>
      </span>
    );
  }

  return (
    <Link href={`/contestant/${p.userId}`} className="link">
      {p.firstName} {p.lastName}
    </Link>
  );
}

export function ParticipationRank({
  participation: p,
  short,
}: {
  participation: Participation;
  short?: boolean;
}) {
  if (p.type === "unofficial") {
    return <span className="text-base-content/70 italic text-sm">Non ufficiale</span>;
  }
  const content = p.rank === null ? "-" : short ? p.rank : `${p.rank}° posto`;
  if (p.type === "online") {
    return (
      <span className="inline-flex items-center justify-center">
        <Medal type={p.medal}>{content}</Medal>
      </span>
    );
  }
  return <Medal type={p.medal}>{content}</Medal>;
}

export async function ParticipationRegion({ participation }: { participation: Participation }) {
  if (!participation.region) return "-";

  const region = await getRegion(participation.region);
  return (
    <Link href={`/region/${region.id}/${participation.year}`} className="link">
      <RegionImage region={region} className="size-8 !p-0 mx-auto" />
    </Link>
  );
}

export function ParticipationInternationals({ participation }: { participation: Participation }) {
  if (!participation.internationals) return "-";

  return participation.internationals
    .split(",")
    .map((int) => <InternationalBadge key={int} code={int} />);
}

export function ParticipationScore({ participation }: { participation: Participation }) {
  const score = participation.score;
  if (score === null) return "N/A";
  return round(score, 1);
}

export async function ParticipationTasks({
  participation,
  links,
}: {
  participation: Participation;
  links?: boolean;
}) {
  const scores = await getUserTaskScores(participation.userId, participation.year);

  return scores.map((score) => (
    <div key={score.taskName} className="flex flex-col items-center gap-1">
      {links && (
        <Link href={`/task/${score.year}/${score.taskName}`} className="link">
          {score.taskName}
        </Link>
      )}
      <Score score={score.score} maxScore={score.maxScorePossible} className="w-16" />
    </div>
  ));
}

export async function ParticipationPastResults({
  participation,
}: {
  participation: Participation;
}) {
  const userParticipations = await getUserParticipations(participation.userId);

  return userParticipations
    .filter((p) => p.year < participation.year && p.type !== "unofficial")
    .map((p) => (
      <div key={p.year}>
        <Medal type={p.medal}>
          <Link href={`/contest/${p.year}`} className="link">
            {p.year}
          </Link>
        </Medal>
      </div>
    ));
}
