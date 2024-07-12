import type { Metadata } from "next";
import Link from "next/link";

import InternationalBadge from "~/components/international";
import { Medal } from "~/components/medal";
import { RegionYearCard } from "~/components/region";
import { Table, TableHeaders, TableRow } from "~/components/table";
import { getRegion } from "~/lib/region";
import { type RegionResults, getRegionResults } from "~/lib/region-results";
import { getRegions } from "~/lib/regions";
import { round } from "~/lib/utils";

export async function generateStaticParams() {
  const regions = await getRegions();
  const regionYears = await Promise.all(
    regions.map(async ({ id }) => {
      const region = await getRegion(id);
      return region.years.map(({ year }) => ({ id, year: year.toString() }));
    }),
  );
  return regionYears.flat();
}

type Props = {
  params: { id: string; year: string };
};

export async function generateMetadata({ params: { id, year } }: Props): Promise<Metadata> {
  const region = await getRegion(id);
  return {
    title: `OII Stats - ${region.name} ${year}`,
    description: `Statistiche e classifiche della regione ${region.name} dell'edizione ${year} alle Olimpiadi Italiane di Informatica`,
  };
}

export default async function Page({ params }: Props) {
  const year = Number(params.year);
  const region = await getRegion(params.id);
  const results = await getRegionResults(params.id);

  const result = results.results.find((result) => result.year === year)!;
  const summary = region.years.find((year) => year.year === result.year)!;

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto max-w-2xl">
        <RegionYearCard region={region} year={year} />
      </div>
      <div>
        <h3 className="m-4 text-center text-2xl font-bold">
          <Link href={`/contest/${result.year}`} className="link">
            {summary?.location.location ?? "OII"} {result.year}
          </Link>
        </h3>
        <Table className="grid-cols-[repeat(8,auto)] text-center">
          <TableHeaders>
            <div>Nome</div>
            <div>Risultato</div>
            <div>Internazionali</div>
            <div>Punteggio</div>
            <div className="col-span-4">Dettagli</div>
          </TableHeaders>
          {result.contestants.map((user) => (
            <TableRow key={user.contestant.id}>
              <div>
                <Link href={`/contestant/${user.contestant.id}`} className="link">
                  {user.contestant.first_name} {user.contestant.last_name}
                </Link>
              </div>
              <div>
                <Medal type={user.medal}>
                  {user.rank === null ? "N/A" : `${user.rank}° posto`}
                </Medal>
              </div>
              <div>
                {user.internationals.length > 0
                  ? user.internationals.map((int) => (
                      <InternationalBadge international={int} key={int.code} />
                    ))
                  : "-"}
              </div>
              <div>{getTotalScore(user)}</div>
              <div className="col-span-4 grid grid-cols-subgrid text-left">
                {user.task_scores.map((task) => (
                  <div key={task.name}>
                    <span className="inline-block min-w-8 text-center">{round(task.score)}</span>{" "}
                    <Link href={`/task/${result.year}/${task.name}`} className="link">
                      {task.name}
                    </Link>
                  </div>
                ))}
              </div>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}

type Participation = RegionResults["results"][number]["contestants"][number];

function getTotalScore(participation: Participation) {
  let total = 0;
  let max = 0;
  for (const score of participation.task_scores) {
    if (score.score === null || score.max_score_possible === null) return "N/A";
    total += score.score;
    max += score.max_score_possible;
  }
  return `${round(total)} / ${max}`;
}
