import type { Metadata } from "next";
import Link from "next/link";

import { TaskCard } from "~/components/task";
import { getTasks } from "~/lib/tasks";

export const metadata: Metadata = {
  title: "OII Stats - Problemi",
  description: "Statistiche e classifiche di problemi delle Olimpiadi Italiane di Informatica",
};

export default async function Page() {
  const tasks = await getTasks();
  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">Problemi</h1>
      <div className="grid gap-4 xl:grid-cols-2">
        {tasks.map((task) => (
          <Link
            key={`${task.contest_year}/${task.name}`}
            href={`/task/${task.contest_year}/${task.name}`}>
            <TaskCard task={task} />
          </Link>
        ))}
      </div>
    </>
  );
}
