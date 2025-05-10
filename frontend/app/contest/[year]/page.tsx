import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { ContestCard } from "~/components/card/contest";
import { Table, TableHeaders, TableRow } from "~/components/table";
import {
  ParticipationInternationals,
  ParticipationName,
  ParticipationPastResults,
  ParticipationRank,
  ParticipationRegion,
  ParticipationScore,
  ParticipationTasks,
  TaskHeaders,
} from "~/components/table-columns";
import { getContest, getContests } from "~/lib/contests";
import { getContestParticipations } from "~/lib/participations";
import { getContestTasks } from "~/lib/tasks";

export async function generateStaticParams() {
  const contests = await getContests();
  return contests.map(({ year }) => ({ year: year.toString() }));
}

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = Number((await params).year);
  const contest = await getContest(year);

  const title = `OII Stats - ${contest.location ?? "OII"} ${year}`;
  const description = `Statistiche e classifiche dell'edizione ${year} delle Olimpiadi Italiane di Informatica`;

  const image = contest.image
    ? {
        url: contest.image.src,
        width: contest.image.width,
        height: contest.image.height,
      }
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      type: "website",
      images: image,
      url: `https://stats.olinfo.it/contest/${year}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: "@olimpiadi_info",
      title,
      description,
      images: image,
    },
  };
}

export default async function Page({ params }: Props) {
  const year = Number((await params).year);
  const contest = await getContest(year);
  const participations = await getContestParticipations(year);
  const tasks = await getContestTasks(year);

  return (
    <div className="flex flex-col gap-8" style={{ "--cols": tasks.length + 6 } as CSSProperties}>
      <div className="mx-auto max-w-2xl">
        <ContestCard contest={contest} />
      </div>
      <Table className="grid-cols-[repeat(var(--cols),auto)] text-center">
        <TableHeaders>
          <div>#</div>
          <div>Nome</div>
          <div>Internazionali</div>
          <div>Regione</div>
          <div>Punteggio</div>
          <TaskHeaders tasks={tasks} />
          <div className="w-min text-wrap">Partecipazioni precedenti</div>
        </TableHeaders>
        {participations.map((p) => (
          <TableRow key={p.userId}>
            <div>
              <ParticipationRank participation={p} short />
            </div>
            <div>
              <ParticipationName participation={p} />
            </div>
            <div>
              <ParticipationInternationals participation={p} />
            </div>
            <div>
              <ParticipationRegion participation={p} />
            </div>
            <div>
              <ParticipationScore participation={p} />
            </div>
            <ParticipationTasks participation={p} />
            <div>
              <ParticipationPastResults participation={p} />
            </div>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
