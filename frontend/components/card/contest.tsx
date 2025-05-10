"use client";

import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";
import { round } from "lodash-es";

import { Image } from "~/components/image";
import { Medals } from "~/components/medal";
import type { Contest } from "~/lib/contests";

export function ContestCard({ contest }: { contest: Contest }) {
  return (
    <Card className="h-full">
      <ContestImage
        contest={contest}
        className="w-52 flex-none max-sm:mx-auto max-sm:mt-4 max-sm:rounded-box sm:min-h-52"
      />
      <CardBody title={`${contest.location ?? "OII"} ${contest.year}`}>
        <div>
          <span className="font-semibold">Partecipanti:</span> {contest.numContestants}
        </div>
        <div>
          <span className="font-semibold">Punteggio massimo ottenuto:</span>{" "}
          {contest.maxScore == null ? "N/A" : round(contest.maxScore, 1)}
        </div>
        <div>
          <span className="font-semibold">Punteggio medio:</span>{" "}
          {contest.avgScore == null ? "N/A" : round(contest.avgScore, 1)}
        </div>
        <div className="mt-2">
          <Medals {...contest.medals} />
        </div>
      </CardBody>
    </Card>
  );
}

export function ContestImage({
  contest,
  className,
}: {
  contest: Contest;
  className?: string;
}) {
  return contest.image ? (
    <Image
      src={contest.image}
      alt={`Logo OII ${contest.year}`}
      className={clsx("bg-white p-4 sm:object-contain", className)}
    />
  ) : (
    <div
      className={clsx(
        "flex aspect-square items-center justify-center bg-neutral p-4 text-center text-5xl font-bold text-neutral-content",
        className,
      )}>
      OII {contest.year}
    </div>
  );
}
