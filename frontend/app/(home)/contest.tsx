import Link from "next/link";
import { Fragment } from "react";

import { Card, CardBody } from "@olinfo/react-components";

import { ContestImage } from "~/components/card/contest";
import { getContest } from "~/lib/contests";
import type { ContestStat } from "~/lib/stats";

import { ContestLocation, GenderGraph, ParticipantsGraph } from "./contest-charts";

export async function ContestStatCard({ stat }: { stat: ContestStat }) {
  switch (stat.type) {
    case "contest_with_most_participants": {
      const contest = await getContest(stat.year);
      return (
        <Card className="!flex-col">
          {contest.image && (
            <ContestImage contest={contest} className="mx-auto mt-4 w-52 rounded-box" />
          )}
          <CardBody title={`Edizione ${contest.year}`}>
            <div>
              Nel{" "}
              <Link href={`/contest/${contest.year}`} className="link">
                {contest.year}
              </Link>{" "}
              ci sono stati {contest.numContestants} partecipanti, il maggior numero di sempre.
            </div>
          </CardBody>
        </Card>
      );
    }

    case "contest_with_most_ex_aequo": {
      const contest = await getContest(stat.year);
      return (
        <Card className="!flex-col">
          {contest.image && (
            <ContestImage contest={contest} className="mx-auto mt-4 w-52 rounded-box" />
          )}
          <CardBody title={`Edizione ${contest.year}`}>
            <div>
              Nel{" "}
              <Link href={`/contest/${contest.year}`} className="link">
                {contest.year}
              </Link>{" "}
              ci sono stati {stat.num_ex_aequo} vincitori a pari merito.
            </div>
          </CardBody>
        </Card>
      );
    }

    case "contest_with_most_girls": {
      const contest = await getContest(stat.year);
      return (
        <Card className="!flex-col">
          {contest.image && (
            <ContestImage contest={contest} className="mx-auto mt-4 w-52 rounded-box" />
          )}
          <CardBody title={`Edizione ${contest.year}`}>
            <div>
              Il{" "}
              <Link href={`/contest/${contest.year}`} className="link">
                {contest.year}
              </Link>{" "}
              è stato l'anno con la maggior percentuale di ragazze, {stat.num_girls} su{" "}
              {contest.numContestants}.
            </div>
          </CardBody>
        </Card>
      );
    }

    case "contest_most_northern": {
      const contest = await getContest(stat.year);
      return (
        <Card className="!flex-col">
          <ContestLocation contest={contest} />
          <CardBody title={`Edizione ${contest.year}`}>
            <div>
              L'edizione più a nord è stata a {contest.location} nel{" "}
              <Link href={`/contest/${contest.year}`} className="link">
                {contest.year}
              </Link>
              .
            </div>
          </CardBody>
        </Card>
      );
    }

    case "contest_most_southern": {
      const contest = await getContest(stat.year);
      return (
        <Card className="!flex-col">
          <ContestLocation contest={contest} />
          <CardBody title={`Edizione ${contest.year}`}>
            <div>
              L'edizione più a sud è stata a {contest.location} nel{" "}
              <Link href={`/contest/${contest.year}`} className="link">
                {contest.year}
              </Link>
              .
            </div>
          </CardBody>
        </Card>
      );
    }

    case "contest_most_used_location": {
      const contest = await getContest(stat.years[0]);
      return (
        <Card className="!flex-col">
          <ContestLocation contest={contest} />
          <CardBody title={contest.location}>
            <div>
              {contest.location} ha ospitato le edizioni{" "}
              {stat.years.slice(0, -1).map((year) => (
                <Fragment key={year}>
                  <Link href={`/contest/${year}`} className="link">
                    {year}
                  </Link>
                  ,{" "}
                </Fragment>
              ))}{" "}
              e{" "}
              <Link href={`/contest/${stat.years.at(-1)}`} className="link">
                {stat.years.at(-1)}
              </Link>
              .
            </div>
          </CardBody>
        </Card>
      );
    }

    case "contest_num_boys_girls": {
      return (
        <Card className="!flex-col">
          <CardBody title="Partecipanti per genere">
            <GenderGraph years={stat.years} />
          </CardBody>
        </Card>
      );
    }

    case "contest_num_participants_per_year": {
      return (
        <Card className="!flex-col">
          <CardBody title="Partecipanti per anno">
            <ParticipantsGraph years={stat.years} />
          </CardBody>
        </Card>
      );
    }
  }
}
