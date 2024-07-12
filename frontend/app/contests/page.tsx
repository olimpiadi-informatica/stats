import type { Metadata } from "next";
import Link from "next/link";

import { ContestCard } from "~/components/contest";
import { getContests } from "~/lib/contests";

export const metadata: Metadata = {
  title: "OII Stats - Edizioni",
  description: "Statistiche e classifiche delle Olimpiadi Italiane di Informatica",
};

export default async function Page() {
  const contests = await getContests();
  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">Edizioni</h1>
      <div className="grid gap-4 xl:grid-cols-2">
        {contests.map((contest) => (
          <Link href={`/contest/${contest.year}`} key={contest.year}>
            <ContestCard contest={contest} />
          </Link>
        ))}
      </div>
    </>
  );
}
