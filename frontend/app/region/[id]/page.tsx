import type { Metadata } from "next";
import Link from "next/link";

import { round } from "lodash-es";
import { RegionCard } from "~/components/card/region";
import { Medals } from "~/components/medal";
import { Table, TableHeaders, TableRow } from "~/components/table";
import { getRegionContests } from "~/lib/region-contest";
import { getRegion } from "~/lib/regions";
import { getRegions } from "~/lib/regions";

export async function generateStaticParams() {
  return getRegions();
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const region = await getRegion(id);
  return {
    title: `OII Stats - ${region.name}`,
    description: `Statistiche e classifiche della regione ${region.name} alle Olimpiadi Italiane di Informatica`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const region = await getRegion(id);
  const contests = await getRegionContests(id);

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto max-w-2xl">
        <RegionCard region={region} />
      </div>
      <Table className="grid-cols-[repeat(4,auto)] text-center">
        <TableHeaders>
          <div>Edizione</div>
          <div>Partecipanti</div>
          <div>Medagliati</div>
          <div>Medaglie</div>
        </TableHeaders>
        {contests.map((contest) => (
          <TableRow key={contest.year}>
            <div className="min-w-64 text-wrap">
              <Link href={`/region/${id}/${contest.year}`} className="link">
                {contest.location} {contest.year}
              </Link>
              {contest.hosted && <span className="badge badge-warning badge-sm mx-2">HOST</span>}
            </div>
            <div>{contest.numContestants}</div>
            <div>{round((contest.numMedalists / contest.numContestants) * 100, 1)}%</div>
            <div>
              <Medals {...contest.medals} />
            </div>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
