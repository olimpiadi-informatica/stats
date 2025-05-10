import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardBody } from "@olinfo/react-components";

import { UserImage } from "~/components/card/user";
import { Medals } from "~/components/medal";
import type { UserStat } from "~/lib/stats";
import { type User, getUser } from "~/lib/users";

export async function UserStatCard({ stat }: { stat: UserStat }) {
  switch (stat.type) {
    case "user_best": {
      const user = await getUser(stat.user);
      return (
        <BaseUserStatCard user={user}>
          <div>
            Lo studente cha vinto più medaglie è{" "}
            <Link href={`/contestant/${user.id}`} className="link">
              {user.firstName} {user.lastName}
            </Link>
            .
          </div>
          <Medals {...user.medals} />
        </BaseUserStatCard>
      );
    }

    case "user_win_at_first_participation": {
      const user = await getUser(stat.user);
      return (
        <BaseUserStatCard user={user}>
          <div>
            <Link href={`/contestant/${user.id}`} className="link">
              {user.firstName} {user.lastName}
            </Link>{" "}
            ha vinto l'edizione {stat.year} alla sua prima partecipazione.
          </div>
        </BaseUserStatCard>
      );
    }

    case "user_ioist_with_worst_rank": {
      const user = await getUser(stat.user);
      return (
        <BaseUserStatCard user={user}>
          <div>
            Nel {stat.year},{" "}
            <Link href={`/contestant/${user.id}`} className="link">
              {user.firstName} {user.lastName}
            </Link>{" "}
            ha partecipato alle IOI nonostante fosse arrivato {stat.rank}°.
          </div>
        </BaseUserStatCard>
      );
    }
  }
}

function BaseUserStatCard({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  return (
    <Card className="!flex-col">
      <UserImage user={user} className="mx-auto mt-4 size-52 rounded-box" />
      <CardBody title={`${user.firstName ?? ""} ${user.lastName}`}>{children}</CardBody>
    </Card>
  );
}
