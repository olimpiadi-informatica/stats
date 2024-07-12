import type { StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardBody } from "@olinfo/react-components";

import { RegionImage } from "~/components/region";
import type { RegionStat } from "~/lib/stats";
import { round } from "~/lib/utils";

export function RegionStatCard({ stat }: { stat: RegionStat }) {
  if ("region_with_most_medals" in stat) {
    const first = stat.region_with_most_medals.first;
    const second = stat.region_with_most_medals.second;
    return (
      <BaseRegionStatCard region={first}>
        <div>
          La regione con il maggior numero di medaglie è{" "}
          <Link href={`/region/${first.id}`} className="link">
            {first.name}
          </Link>{" "}
          con {first.num_medals.gold} ori, {first.num_medals.silver} argenti e{" "}
          {first.num_medals.bronze} bronzi.
        </div>
        <div>
          Al secondo posto c'è{" "}
          <Link href={`/region/${second.id}`} className="link">
            {second.name}
          </Link>{" "}
          con {second.num_medals.gold} ori, {second.num_medals.silver} argenti e{" "}
          {second.num_medals.bronze} bronzi.
        </div>
      </BaseRegionStatCard>
    );
  }

  if ("region_with_most_medals_per_participant" in stat) {
    const region = stat.region_with_most_medals_per_participant;
    return (
      <BaseRegionStatCard region={region}>
        <div>
          La regione con il maggior numero di medaglie per partecipante è{" "}
          <Link href={`/region/${region.id}`} className="link">
            {region.name}
          </Link>
          , il {round(region.medals_per_participant * 100)}% dei partecipanti ha vinto una medaglia.
        </div>
      </BaseRegionStatCard>
    );
  }

  if ("region_with_most_first_places" in stat) {
    const region = stat.region_with_most_first_places;
    return (
      <BaseRegionStatCard region={region}>
        <div>
          La regione con il maggior numero di primi posti è{" "}
          <Link href={`/region/${region.id}`} className="link">
            {region.name}
          </Link>{" "}
          con {region.num_first_places} vincitori.
        </div>
      </BaseRegionStatCard>
    );
  }

  if ("region_with_most_participants" in stat) {
    const region = stat.region_with_most_participants;
    return (
      <BaseRegionStatCard region={region}>
        <div>
          La regione con il maggior numero di partecipanti è{" "}
          <Link href={`/region/${region.id}`} className="link">
            {region.name}
          </Link>{" "}
          con {region.num_participants} partecipanti.
        </div>
      </BaseRegionStatCard>
    );
  }
}

function BaseRegionStatCard({
  region: { name, image },
  children,
}: {
  region: { name: string; image: StaticImageData };
  children: ReactNode;
}) {
  return (
    <Card className="!flex-col">
      <RegionImage region={name} image={image} className="mx-auto mt-4 size-52" />
      <CardBody title={name}>{children}</CardBody>
    </Card>
  );
}
