import Link from "next/link";

import { ContestCard } from "~/components/card/contest";
import { RegionCard } from "~/components/card/region";
import { TaskCard } from "~/components/card/task";
import { UserCard } from "~/components/card/user";
import type { SearchResultValue } from "~/lib/search";

export function SearchCard({ v }: { v: SearchResultValue }) {
  if (v.contest) {
    return (
      <Link href={`/contest/${v.contest.year}`}>
        <ContestCard contest={v.contest} />
      </Link>
    );
  }
  if (v.region) {
    return (
      <Link href={`/region/${v.region.id}`}>
        <RegionCard region={v.region} />
      </Link>
    );
  }
  if (v.task) {
    return (
      <Link href={`/task/${v.task.contestYear}/${v.task.name}`}>
        <TaskCard task={v.task} />
      </Link>
    );
  }
  if (v.user) {
    return (
      <Link href={`/contestant/${v.user.id}`}>
        <UserCard user={v.user} />
      </Link>
    );
  }
}
