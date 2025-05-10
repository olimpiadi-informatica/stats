import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import { RegionYearCard } from "~/components/card/region";
import { Table, TableHeaders, TableRow } from "~/components/table";
import {
  ParticipationInternationals,
  ParticipationName,
  ParticipationRank,
  ParticipationScore,
  ParticipationTasks,
  TaskHeaders,
} from "~/components/table-columns";
import { getContestParticipations } from "~/lib/participations";
import { getRegionContest, getRegionContests } from "~/lib/region-contest";
import { getRegion } from "~/lib/regions";
import { getRegions } from "~/lib/regions";
import { getContestTasks } from "~/lib/tasks";

export async function generateStaticParams() {
  const regions = await getRegions();
  const regionYears = await Promise.all(
    regions.map(async ({ id }) => {
      const regionContest = await getRegionContests(id);
      return regionContest.map(({ year }) => ({ id, year: year.toString() }));
    }),
  );
  return regionYears.flat();
}

type Props = {
  params: Promise<{ id: string; year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, year } = await params;
  const region = await getRegion(id);
  return {
    title: `OII Stats - ${region.name} ${year}`,
    description: `Statistiche e classifiche della regione ${region.name} dell'edizione ${year} alle Olimpiadi Italiane di Informatica`,
  };
}

export default async function Page({ params }: Props) {
  const year = Number((await params).year);
  const regionId = (await params).id;

  const region = await getRegion(regionId);
  const regionContest = await getRegionContest(regionId, year);
  const participations = await getContestParticipations(year, regionId);
  const tasks = await getContestTasks(year);

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto max-w-2xl">
        <RegionYearCard region={region} regionContest={regionContest} />
      </div>
      <div style={{ "--cols": tasks.length + 4 } as CSSProperties}>
        <h3 className="m-4 text-center text-2xl font-bold">
          <Link href={`/contest/${year}`} className="link">
            {regionContest.location ?? "OII"} {regionContest.year}
          </Link>
        </h3>
        <Table className="grid-cols-[repeat(var(--cols),auto)] text-center">
          <TableHeaders>
            <div>Nome</div>
            <div>Risultato</div>
            <div>Internazionali</div>
            <div>Punteggio</div>
            <TaskHeaders tasks={tasks} />
          </TableHeaders>
          {participations.map((p) => (
            <TableRow key={p.userId}>
              <div>
                <ParticipationName participation={p} />
              </div>
              <div>
                <ParticipationRank participation={p} />
              </div>
              <div>
                <ParticipationInternationals participation={p} />
              </div>
              <div>
                <ParticipationScore participation={p} />
              </div>
              <ParticipationTasks participation={p} />
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}
