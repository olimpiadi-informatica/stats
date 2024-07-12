import type { StaticImageData } from "next/image";

import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";

import { Image } from "~/components/image";
import { Medals } from "~/components/medal";
import type { Region } from "~/lib/region";
import type { Regions } from "~/lib/regions";
import { round } from "~/lib/utils";

export function RegionCard({ region }: { region: Region | Regions[number] }) {
  return (
    <Card className="h-full">
      <RegionImage
        region={region.name}
        image={region.image}
        className="size-52 flex-none max-sm:mx-auto max-sm:mt-4"
      />
      <CardBody title={region.name}>
        <div>
          <span className="font-semibold">Partecipanti:</span> {region.num_contestants}
        </div>
        <div>
          <span className="font-semibold">Partecipanti medi all'anno:</span>{" "}
          {region.avg_contestants_per_year}
        </div>
        <div className="mt-2">
          <Medals {...region.medals} />
        </div>
      </CardBody>
    </Card>
  );
}

export function RegionYearCard({ region, year }: { region: Region; year: number }) {
  const r = region.years.find((y) => y.year === year)!;
  return (
    <Card className="h-full">
      <RegionImage
        region={region.name}
        image={region.image}
        className="size-52 flex-none max-sm:mx-auto max-sm:mt-4"
      />
      <CardBody title={`${region.name} - ${year}`}>
        <div>
          <span className="font-semibold">Partecipanti:</span> {r.num_contestants}
        </div>
        <div>
          <span className="font-semibold">Medagliati:</span>{" "}
          {round(
            ((r.num_medals.gold + r.num_medals.silver + r.num_medals.bronze) / r.num_contestants) *
              100,
          )}
          %
        </div>
        <div className="mt-2">
          <Medals {...r.num_medals} />
        </div>
      </CardBody>
    </Card>
  );
}

export function RegionImage({
  region,
  image,
  className,
}: {
  region: string;
  image: StaticImageData;
  className?: string;
}) {
  return (
    <Image src={image} alt={`Stemma ${region}`} className={clsx("object-contain p-4", className)} />
  );
}
