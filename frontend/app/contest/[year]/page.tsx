import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ContestCard } from "~/components/contest";
import InternationalBadge from "~/components/international";
import { Medal } from "~/components/medal";
import { RegionImage } from "~/components/region";
import { Score } from "~/components/score";
import { Table, TableHeaders, TableRow } from "~/components/table";
import { getContestResults } from "~/lib/contest-results";
import { getContest, getContests } from "~/lib/contests";
import { round } from "~/lib/utils";

export async function generateStaticParams() {
  const contests = await getContests();
  return contests.map(({ year }) => ({ year: year.toString() }));
}

type Props = {
  params: { year: string };
};

export async function generateMetadata({ params: { year } }: Props): Promise<Metadata> {
  const contest = await getContest(year);

  const title = `OII Stats - ${contest.location.location ?? "OII"} ${year}`;
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

export default async function Page({ params: { year } }: Props) {
  const contest = await getContest(year);
  const results = await getContestResults(year);
  return (
    <div
      className="flex flex-col gap-8"
      style={{ "--cols": contest.tasks.length + 6 } as CSSProperties}>
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
          {results.tasks.map((task, i) => (
            <div key={i} className="!opacity-100">
              <Link href={`/task/${year}/${task}`} className="link">
                {task}
              </Link>
            </div>
          ))}
          <div className="w-min text-wrap">Partecipazioni precedenti</div>
        </TableHeaders>
        {results.results.map((result) => (
          <TableRow key={result.contestant.id}>
            <div>
              <Medal type={result.medal}>{result.rank ?? "N/A"}</Medal>
            </div>
            <div>
              <Link href={`/contestant/${result.contestant.id}`} className="link">
                {result.contestant.first_name} {result.contestant.last_name}
              </Link>
            </div>
            <div>
              {result.internationals.length > 0
                ? result.internationals.map((int) => (
                    <InternationalBadge international={int} key={int.code} />
                  ))
                : "-"}
            </div>
            <div>
              {result.region && result.regionImage ? (
                <Link href={`/region/${result.region}/${contest.year}`} className="link">
                  <RegionImage
                    region={result.region}
                    image={result.regionImage}
                    className="size-8 !p-0 mx-auto"
                  />
                </Link>
              ) : (
                "-"
              )}
            </div>
            <div>{round(result.score)}</div>
            {result.scores.map((score, i) => (
              <div key={i}>
                <Score
                  score={score}
                  maxScore={contest.tasks[i].max_score_possible}
                  className="w-16 mx-auto"
                />
              </div>
            ))}
            <div>
              {result.past_participations.map((p) => (
                <div key={p.year}>
                  <Medal type={p.medal}>
                    <Link href={`/contest/${p.year}`} className="link">
                      {p.year}
                    </Link>
                  </Medal>
                </div>
              ))}
            </div>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
