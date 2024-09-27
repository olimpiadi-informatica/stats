import type { Metadata } from "next";
import Link from "next/link";

import { Table, TableHeaders, TableRow } from "~/components/table";
import { TaskCard } from "~/components/task";
import { getTask } from "~/lib/task";
import { getTasks } from "~/lib/tasks";
import { round } from "~/lib/utils";

export async function generateStaticParams() {
  const tasks = await getTasks();
  return tasks.map(({ contest_year, name }) => ({ year: contest_year.toString(), name }));
}

type Props = {
  params: { year: string; name: string };
};

export async function generateMetadata({ params: { year, name } }: Props): Promise<Metadata> {
  const task = await getTask(year, name);

  const title = `OII Stats - ${task.name}`;
  const description = `Statistiche e classifiche del problema ${task.name} delle Olimpiadi Italiane di Informatica ${task.contest_year}`;

  const image = task.image
    ? {
        url: task.image.src,
        width: task.image.width,
        height: task.image.height,
      }
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      type: "website",
      images: image,
      url: `https://stats.olinfo.it/task/${year}/${name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: "@olimpiadi_info",
      title,
      description,
      images: image,
    },
  };
}

export default async function Page({ params: { year, name } }: Props) {
  const task = await getTask(year, name);
  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto max-w-2xl">
        <TaskCard task={task} links />
      </div>
      <Table className="grid-cols-[auto_minmax(auto,1fr)_auto] text-center">
        <TableHeaders>
          <div>#</div>
          <div>Nome</div>
          <div>Punteggio</div>
        </TableHeaders>
        {task.scores.map((user) => (
          <TableRow key={user.contestant.id}>
            <div>{user.rank ?? "N/A"}</div>
            <div>
              <Link href={`/contestant/${user.contestant.id}`} className="link">
                {user.contestant.first_name} {user.contestant.last_name}
              </Link>
            </div>
            <div>{round(user.score)}</div>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
