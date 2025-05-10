import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardBody } from "@olinfo/react-components";
import { round } from "lodash-es";

import { RegionImage } from "~/components/card/region";
import { type Region, getRegion } from "~/lib/regions";
import type { RegionStat } from "~/lib/stats";

export async function RegionStatCard({ stat }: { stat: RegionStat }) {
  switch (stat.type) {
    case "region_with_most_medals": {
      const first = await getRegion(stat.region);
      const second = await getRegion(stat.region2);
      return (
        <BaseRegionStatCard region={first}>
          <div>
            La regione con il maggior numero di medaglie è{" "}
            <Link href={`/region/${first.id}`} className="link">
              {first.name}
            </Link>{" "}
            con {first.medals.gold} ori, {first.medals.silver} argenti e {first.medals.bronze}{" "}
            bronzi.
          </div>
          <div>
            Al secondo posto c'è{" "}
            <Link href={`/region/${second.id}`} className="link">
              {second.name}
            </Link>{" "}
            con {second.medals.gold} ori, {second.medals.silver} argenti e {second.medals.bronze}{" "}
            bronzi.
          </div>
        </BaseRegionStatCard>
      );
    }

    case "region_with_most_medals_per_participant": {
      const region = await getRegion(stat.region);
      return (
        <BaseRegionStatCard region={region}>
          <div>
            La regione con il maggior numero di medaglie per partecipante è{" "}
            <Link href={`/region/${region.id}`} className="link">
              {region.name}
            </Link>
            , il {round(stat.medals_per_participant * 100, 1)}% dei partecipanti ha vinto una
            medaglia.
          </div>
        </BaseRegionStatCard>
      );
    }

    case "region_with_most_first_places": {
      const region = await getRegion(stat.region);
      return (
        <BaseRegionStatCard region={region}>
          <div>
            La regione con il maggior numero di primi posti è{" "}
            <Link href={`/region/${region.id}`} className="link">
              {region.name}
            </Link>{" "}
            con {stat.num_first_places} vincitori.
          </div>
        </BaseRegionStatCard>
      );
    }

    case "region_with_most_participants": {
      const region = await getRegion(stat.region);
      return (
        <BaseRegionStatCard region={region}>
          <div>
            La regione con il maggior numero di partecipanti è{" "}
            <Link href={`/region/${region.id}`} className="link">
              {region.name}
            </Link>{" "}
            con {stat.num_participants} partecipanti.
          </div>
        </BaseRegionStatCard>
      );
    }
  }
}

function BaseRegionStatCard({
  region,
  children,
}: {
  region: Region;
  children: ReactNode;
}) {
  return (
    <Card className="!flex-col">
      <RegionImage region={region} className="mx-auto mt-4 size-52" />
      <CardBody title={region.name}>{children}</CardBody>
    </Card>
  );
}
