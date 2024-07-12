import type { StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardBody } from "@olinfo/react-components";

import { Medals } from "~/components/medal";
import { ContestantImage } from "~/components/user";
import type { Contestant } from "~/lib/common";
import type { UserStat } from "~/lib/stats";

export function UserStatCard({ stat }: { stat: UserStat }) {
  if ("best_student" in stat) {
    const { contestant, num_medals, image } = stat.best_student;
    return (
      <BaseUserStatCard contestant={contestant} image={image}>
        <div>
          Lo studente cha vinto più medaglie è{" "}
          <Link href={`/contestant/${contestant.id}`} className="link">
            {contestant.first_name} {contestant.last_name}
          </Link>
          .
        </div>
        <Medals {...num_medals} />
      </BaseUserStatCard>
    );
  }

  if ("win_at_first_participation" in stat) {
    const { contestant, year, image } = stat.win_at_first_participation;
    return (
      <BaseUserStatCard contestant={contestant} image={image}>
        <div>
          <Link href={`/contestant/${contestant.id}`} className="link">
            {contestant.first_name} {contestant.last_name}
          </Link>{" "}
          ha vinto l'edizione {year} alla sua prima partecipazione.
        </div>
      </BaseUserStatCard>
    );
  }

  if ("ioist_with_worst_rank" in stat) {
    const { contestant, contest_year, rank, image } = stat.ioist_with_worst_rank;
    return (
      <BaseUserStatCard contestant={contestant} image={image}>
        <div>
          Nel {contest_year},{" "}
          <Link href={`/contestant/${contestant.id}`} className="link">
            {contestant.first_name} {contestant.last_name}
          </Link>{" "}
          ha partecipato alle IOI nonostante fosse arrivato {rank}°.
        </div>
      </BaseUserStatCard>
    );
  }
}

function BaseUserStatCard({
  contestant,
  image,
  children,
}: {
  contestant: Contestant;
  image: StaticImageData | null;
  children: ReactNode;
}) {
  return (
    <Card className="!flex-col">
      {image && (
        <ContestantImage
          contestant={contestant}
          image={image}
          className="mx-auto mt-4 size-52 rounded-box"
        />
      )}
      <CardBody title={`${contestant.first_name ?? ""} ${contestant.last_name}`}>
        {children}
      </CardBody>
    </Card>
  );
}
