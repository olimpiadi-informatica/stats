"use client";

import Link from "next/link";
import { useEffect } from "react";

import { VirtuosoGrid } from "react-virtuoso";
import { preload } from "swr";
import useSWRInfinite from "swr/infinite";

import { UserCard } from "~/components/card/user";
import { Loading } from "~/components/placeholder";
import type { User } from "~/lib/users";

type Props = {
  firstChunk: User[];
};

export function ContestantGrid({ firstChunk }: Props) {
  const { data, size, setSize } = useSWRInfinite<User[]>(
    (index) => ["competitors", index],
    contestantsFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      parallel: true,
    },
  );

  useEffect(() => {
    preload(["competitors", 1], contestantsFetcher);
  }, []);

  return (
    <VirtuosoGrid
      useWindowScroll
      className="grow"
      listClassName="grid xl:grid-cols-2 gap-4 mb-4"
      initialItemCount={16}
      data={data?.flat() ?? firstChunk}
      endReached={() => {
        preload(["competitors", size + 1], contestantsFetcher);
        setSize(size + 1);
      }}
      itemContent={(_index, user) => (
        <Link href={`/contestant/${user.id}`}>
          <UserCard user={user} />
        </Link>
      )}
      components={{ Footer: Loading }}
    />
  );
}

async function contestantsFetcher([_endpoint, page]: [string, string]) {
  const resp = await fetch(`/api/contestants/${page}`);
  return resp.json();
}
