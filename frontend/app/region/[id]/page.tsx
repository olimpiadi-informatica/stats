import { Metadata } from "next";
import Link from "next/link";

import { Medals } from "~/components/medal";
import { RegionCard } from "~/components/region";
import { Table, TableHeaders, TableRow } from "~/components/table";
import { getRegion } from "~/lib/region";
import { getRegions } from "~/lib/regions";
import { round } from "~/lib/utils";

export async function generateStaticParams() {
  return getRegions();
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const region = await getRegion(id);
  return {
    title: `OII Stats - ${region.name}`,
    description: `Statistiche e classifiche della regione ${region.name} alle Olimpiadi Italiane di Informatica`,
  };
}

export default async function Page({ params: { id } }: Props) {
  const region = await getRegion(id);
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
        {region.years.map((year) => (
          <TableRow key={year.year}>
            <div className="min-w-64 text-wrap">
              <Link href={`/region/${id}/${year.year}`} className="link">
                {year.location.location} {year.year}
              </Link>
              {region.hosted.includes(year.year) && (
                <span className="badge badge-warning badge-sm mx-2">HOST</span>
              )}
            </div>
            <div>{year.num_contestants}</div>
            <div>
              {round(
                ((year.num_medals.gold + year.num_medals.silver + year.num_medals.bronze) /
                  year.num_contestants) *
                  100,
              )}
              %
            </div>
            <div>
              <Medals {...year.num_medals} />
            </div>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
