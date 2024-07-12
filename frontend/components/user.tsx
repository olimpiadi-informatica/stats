import type { StaticImageData } from "next/image";
import Link from "next/link";

import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";

import { Image } from "~/components/image";
import { Medals } from "~/components/medal";
import type { Contestant } from "~/lib/common";
import type { User } from "~/lib/user";
import type { Users } from "~/lib/users";

export function UserCard({ user, links }: { user: User | Users[number]; links?: boolean }) {
  return (
    <Card className="h-full">
      <div className="relative min-h-52 w-52 self-stretch max-sm:mx-auto max-sm:mt-4">
        <ContestantImage
          contestant={user.contestant}
          image={user.image}
          className="absolute inset-0 size-full max-sm:rounded-box"
        />
      </div>
      <CardBody title={`${user.contestant.first_name ?? ""} ${user.contestant.last_name}`}>
        <div>
          <span className="font-semibold">Partecipazioni:</span>{" "}
          {user.participations.map((p) => p.year).join(", ")}
        </div>
        <div>
          <span className="font-semibold">Miglior piazzamento:</span> {user.best_rank ?? "N/A"}°
          posto
        </div>
        {links && user.contestant.username && (
          <div>
            <span className="font-semibold">Profilo su training.olinfo.it:</span>{" "}
            <Link
              href={`https://training.olinfo.it/#/user/${user.contestant.username}/profile`}
              className="link">
              {user.contestant.username}
            </Link>
          </div>
        )}
        <div className="mt-2">
          <Medals {...user.num_medals} />
        </div>
      </CardBody>
    </Card>
  );
}

export function ContestantImage({
  contestant,
  image,
  className,
}: {
  contestant: Contestant;
  image: StaticImageData | null;
  className?: string;
}) {
  return image ? (
    <Image
      src={image}
      alt={`Foto di ${contestant.first_name ?? ""} ${contestant.last_name}`}
      className={clsx("object-cover", className)}
    />
  ) : (
    <div
      className={clsx(
        "flex items-center justify-center bg-neutral p-4 text-7xl font-bold text-neutral-content",
        className,
      )}>
      {(contestant.first_name?.[0] ?? "") + contestant.last_name[0]}
    </div>
  );
}
