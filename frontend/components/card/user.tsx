"use client";

import Link from "next/link";

import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";

import { Image } from "~/components/image";
import { Medals } from "~/components/medal";
import type { User } from "~/lib/users";

export function UserCard({ user, links }: { user: User; links?: boolean }) {
  return (
    <Card className="h-full">
      <div className="relative min-h-52 w-52 self-stretch max-sm:mx-auto max-sm:mt-4">
        <UserImage user={user} className="absolute inset-0 size-full max-sm:rounded-box" />
      </div>
      <CardBody title={`${user.firstName ?? ""} ${user.lastName}`}>
        <div>
          <span className="font-semibold">Partecipazioni:</span> {user.participations}
        </div>
        <div>
          <span className="font-semibold">Miglior piazzamento:</span> {user.bestRank ?? "N/A"}°
          posto
        </div>
        {links && user.username && (
          <div>
            <span className="font-semibold">Profilo su training.olinfo.it:</span>{" "}
            <Link
              href={`https://training.olinfo.it/user/${user.username}/profile`}
              className="link">
              {user.username}
            </Link>
          </div>
        )}
        <div className="mt-2">
          <Medals {...user.medals} />
        </div>
      </CardBody>
    </Card>
  );
}

export function UserImage({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return user.image ? (
    <Image
      src={user.image}
      alt={`Foto di ${user.firstName ?? ""} ${user.lastName}`}
      className={clsx("object-cover", className)}
    />
  ) : (
    <div
      className={clsx(
        "flex items-center justify-center bg-neutral p-4 text-7xl font-bold text-neutral-content",
        className,
      )}>
      {(user.firstName?.[0] ?? "") + user.lastName[0]}
    </div>
  );
}
