import type { Metadata } from "next";
import Link from "next/link";

import { UserCard } from "~/components/card/user";
import { Table, TableHeaders, TableRow } from "~/components/table";
import {
  ParticipationInternationals,
  ParticipationRank,
  ParticipationRegion,
  ParticipationScore,
  ParticipationTasks,
} from "~/components/table-columns";
import { getUserParticipations } from "~/lib/participations";
import { type User, getUser, getUserIds } from "~/lib/users";

export function generateStaticParams() {
  return getUserIds();
}

type Props = {
  params: Promise<{ id: string }>;
};

function medalDescription(num: number, medal: string) {
  if (num === 0) return "";
  if (num === 1) return `una medaglia ${medal}`;
  return `${num} medaglie ${medal}`;
}

function medalDescriptions(numMedals: User["medals"]) {
  const medals = [
    medalDescription(numMedals.gold, "d'oro"),
    medalDescription(numMedals.silver, "d'argento"),
    medalDescription(numMedals.bronze, "di bronzo"),
  ].filter(Boolean);

  if (medals.length === 0) return "";
  if (medals.length >= 3) {
    medals.unshift(medals.splice(0, medals.length - 1).join(", "));
  }
  return `, vincitore di ${medals.join(" e ")}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser(id);

  const title = `OII Stats - ${user.firstName ?? ""} ${user.lastName}`;
  const description = `Statistiche di ${user.firstName ?? ""} ${user.lastName}${medalDescriptions(user.medals)}`;

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
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
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
  const { id } = await params;
  const user = await getUser(id);
  const participations = await getUserParticipations(id);
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
        {participations.map((p) => (
          <TableRow key={p.year}>
            <div>
              <Link href={`/contest/${p.year}`} className="link">
                {p.year}
              </Link>
            </div>
            <div>
              <ParticipationRank participation={p} />
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
            <ParticipationTasks participation={p} links />
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
