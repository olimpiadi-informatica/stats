import { StaticImageData } from "next/image";

import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";

import { Image } from "~/components/image";
import { Medals } from "~/components/medal";
import { Contest } from "~/lib/contests";
import { round } from "~/lib/utils";

export function ContestCard({ contest }: { contest: Contest }) {
  return (
    <Card className="h-full">
      <ContestImage
        year={contest.year}
        image={contest.image}
        className="w-52 flex-none max-sm:mx-auto max-sm:mt-4 max-sm:rounded-box sm:min-h-52"
      />
      <CardBody title={`${contest.location.location ?? "OII"} ${contest.year}`}>
        <div>
          <span className="font-semibold">Partecipanti:</span> {contest.num_contestants ?? "N/A"}
        </div>
        <div>
          <span className="font-semibold">Punteggio massimo ottenuto:</span>{" "}
          {contest.max_score ?? "N/A"}
        </div>
        <div>
          <span className="font-semibold">Punteggio medio:</span> {round(contest.avg_score)}
        </div>
        <div className="mt-2">
          <Medals
            gold={contest.medals.gold.count}
            silver={contest.medals.silver.count}
            bronze={contest.medals.bronze.count}
          />
        </div>
      </CardBody>
    </Card>
  );
}

export function ContestImage({
  year,
  image,
  className,
}: {
  year: string | number;
  image: StaticImageData | null;
  className?: string;
}) {
  return image ? (
    <Image
      src={image}
      alt={`Logo OII ${year}`}
      className={clsx("bg-white p-4 sm:object-contain", className)}
    />
  ) : (
    <div
      className={clsx(
        "flex aspect-square items-center justify-center bg-neutral p-4 text-center text-5xl font-bold text-neutral-content",
        className,
      )}>
      OII {year}
    </div>
  );
}
