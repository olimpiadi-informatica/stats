"use client";

import { Children, Fragment, ReactNode, useEffect, useState } from "react";

export function PageClient(props: {
  regions: ReactNode;
  users: ReactNode;
  tasks: ReactNode;
  contests: ReactNode;
}) {
  const [stats, setStats] = useState<ReactNode>();
  useEffect(() => {
    const regions = sample(Children.toArray(props.regions), 2);
    const users = sample(Children.toArray(props.users), 2);
    const tasks = sample(Children.toArray(props.tasks), 2);
    const contests = sample(Children.toArray(props.contests), 2);

    setStats(
      shuffle(
        [...regions, ...users, ...tasks, ...contests].map((stat, i) => (
          <Fragment key={i}>{stat}</Fragment>
        )),
      ),
    );
  }, [props.contests, props.regions, props.tasks, props.users]);

  return <div className="*:mb-4 md:columns-2 lg:columns-3">{stats}</div>;
}

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sample<T>(array: T[], n: number) {
  return shuffle(array).slice(0, n);
}
