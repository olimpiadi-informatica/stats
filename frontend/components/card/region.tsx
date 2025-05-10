"use client";

import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";
import { round } from "lodash-es";

import { Image } from "~/components/image";
import { Medals } from "~/components/medal";
import type { RegionContest } from "~/lib/region-contest";
import type { Region } from "~/lib/regions";

export function RegionCard({ region }: { region: Region }) {
  return (
    <Card className="h-full">
      <RegionImage region={region} className="size-52 flex-none max-sm:mx-auto max-sm:mt-4" />
      <CardBody title={region.name}>
        <div>
          <span className="font-semibold">Partecipanti:</span> {region.numContestants}
        </div>
        <div>
          <span className="font-semibold">Partecipanti medi all'anno:</span>{" "}
          {round(region.numContestants / region.numYears, 1)}
        </div>
        <div className="mt-2">
          <Medals {...region.medals} />
        </div>
      </CardBody>
    </Card>
  );
}

export function RegionYearCard({
  region,
  regionContest,
}: { region: Region; regionContest: RegionContest }) {
  return (
    <Card className="h-full">
      <RegionImage region={region} className="size-52 flex-none max-sm:mx-auto max-sm:mt-4" />
      <CardBody title={`${region.name} - ${regionContest.year}`}>
        <div>
          <span className="font-semibold">Partecipanti:</span> {regionContest.numContestants}
        </div>
        <div>
          <span className="font-semibold">Medagliati:</span>{" "}
          {round((regionContest.numMedalists / regionContest.numContestants) * 100, 1)}%
        </div>
        <div className="mt-2">
          <Medals {...regionContest.medals} />
        </div>
      </CardBody>
    </Card>
  );
}

export function RegionImage({
  region,
  className,
}: {
  region: Region;
  className?: string;
}) {
  return (
    <Image
      src={region.image!}
      alt={`Stemma ${region.name}`}
      className={clsx("object-contain p-4", className)}
    />
  );
}
