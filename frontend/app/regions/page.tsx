import type { Metadata } from "next";
import Link from "next/link";

import { RegionCard } from "~/components/region";
import { getRegions } from "~/lib/regions";

export const metadata: Metadata = {
  title: "OII Stats - Regioni",
  description: "Statistiche e classifiche delle Olimpiadi Italiane di Informatica",
};

export default async function Page() {
  const regions = await getRegions();

  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">Regioni</h1>
      <div className="grid gap-4 xl:grid-cols-2">
        {regions.map((region) => (
          <Link href={`/region/${region.id}`} key={region.id}>
            <RegionCard region={region} />
          </Link>
        ))}
      </div>
    </>
  );
}
