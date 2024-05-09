import Link from "next/link";

import { ContestCard } from "~/components/contest";
import { RegionCard } from "~/components/region";
import { TaskCard } from "~/components/task";
import { UserCard } from "~/components/user";
import { SearchResultValue } from "~/lib/search";

export function SearchCard({ v }: { v: SearchResultValue }) {
  if ("contest" in v) {
    return (
      <Link href={`/contest/${v.contest.year}`}>
        <ContestCard contest={v.contest} />
      </Link>
    );
  }
  if ("region" in v) {
    return (
      <Link href={`/region/${v.region.id}`}>
        <RegionCard region={v.region} />
      </Link>
    );
  }
  if ("task" in v) {
    return (
      <Link href={`/task/${v.task.year}/${v.task.task.name}`}>
        <TaskCard task={v.task.task} />
      </Link>
    );
  }
  if ("user" in v) {
    return (
      <Link href={`/contestant/${v.user.contestant.id}`}>
        <UserCard user={v.user} />
      </Link>
    );
  }
}
