import type { Metadata } from "next";
import Link from "next/link";

import InternationalBadge from "~/components/international";
import { Medal } from "~/components/medal";
import { RegionImage } from "~/components/region";
import { Score } from "~/components/score";
import { Table, TableHeaders, TableRow } from "~/components/table";
import { UserCard } from "~/components/user";
import { type User, getUser } from "~/lib/user";
import { getUsers } from "~/lib/users";
import { round } from "~/lib/utils";

export async function generateStaticParams() {
  const users = await getUsers();
  return users.map((user) => ({ id: user.contestant.id }));
}

type Props = {
  params: { id: string };
};

function medalDescription(num: number, medal: string) {
  if (num === 0) return "";
  if (num === 1) return `una medaglia ${medal}`;
  return `${num} medaglie ${medal}`;
}

function medalDescriptions(num_medals: User["num_medals"]) {
  const medals = [
    medalDescription(num_medals.gold, "d'oro"),
    medalDescription(num_medals.silver, "d'argento"),
    medalDescription(num_medals.bronze, "di bronzo"),
  ].filter(Boolean);

  if (medals.length === 0) return "";
  if (medals.length >= 3) {
    medals.unshift(medals.splice(0, medals.length - 1).join(", "));
  }
  return `, vincitore di ${medals.join(" e ")}`;
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const user = await getUser(id);

  const title = `OII Stats - ${user.contestant.first_name ?? ""} ${user.contestant.last_name}`;
  const description = `Statistiche di ${user.contestant.first_name ?? ""} ${user.contestant.last_name}${medalDescriptions(user.num_medals)}`;

  const image = user.image
    ? {
        url: user.image.src,
        width: user.image.width,
        height: user.image.height,
      }
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      type: "profile",
      images: image,
      url: `https://stats.olinfo.it/contestant/${id}`,
      description,
      firstName: user.contestant.first_name,
      lastName: user.contestant.last_name,
      username: user.contestant.username,
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

export default async function Page({ params: { id } }: Props) {
  const user = await getUser(id);
  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto max-w-2xl">
        <UserCard user={user} links />
      </div>
      <Table className="grid-cols-[repeat(9,auto)] text-center">
        <TableHeaders>
          <div>Anno</div>
          <div>Risultato</div>
          <div>Internazionali</div>
          <div>Regione</div>
          <div>Punteggio</div>
          <div className="col-span-4">Dettagli</div>
        </TableHeaders>
        {user.participations.map((p) => (
          <TableRow key={p.year}>
            <div>
              <Link href={`/contest/${p.year}`} className="link">
                {p.year}
              </Link>
            </div>
            <div>
              <Medal type={p.medal}>{p.rank === null ? "N/A" : `${p.rank}° posto`}</Medal>
            </div>
            <div>
              {p.internationals.length > 0
                ? p.internationals.map((int) => (
                    <InternationalBadge key={int.code} international={int} />
                  ))
                : "-"}
            </div>
            <div>
              {p.region && p.regionImage ? (
                <Link href={`/region/${p.region}`} className="link">
                  <RegionImage
                    region={p.region}
                    image={p.regionImage}
                    className="size-8 !p-0 mx-auto"
                  />
                </Link>
              ) : (
                "-"
              )}
            </div>
            <div>{getTotalScore(p)}</div>
            {p.scores.map((score) => (
              <div key={score.task} className="flex flex-col items-center gap-1">
                <Link href={`/task/${p.year}/${score.task}`} className="link">
                  {score.task}
                </Link>
                <Score score={score.score} maxScore={score.max_score_possible} className="w-16" />
              </div>
            ))}
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

function getTotalScore(participation: User["participations"][number]) {
  let sum = 0;
  for (const score of participation.scores) {
    if (score.score === null) return "N/A";
    sum += score.score;
  }
  return round(sum);
}
