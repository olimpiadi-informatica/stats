import type { Metadata } from "next";
import Link from "next/link";

import { TaskCard } from "~/components/card/task";
import { Score } from "~/components/score";
import { Table, TableHeaders, TableRow } from "~/components/table";
import { getTaskTaskScores } from "~/lib/task-scores";
import { getTask, getTasks } from "~/lib/tasks";

export async function generateStaticParams() {
  const tasks = await getTasks();
  return tasks.map(({ contestYear, name }) => ({ year: contestYear.toString(), name }));
}

type Props = {
  params: Promise<{ year: string; name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, name } = await params;
  const task = await getTask(+year, name);

  const title = `OII Stats - ${task.name}`;
  const description = `Statistiche e classifiche del problema ${task.name} delle Olimpiadi Italiane di Informatica ${task.contestYear}`;

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

export default async function Page({ params }: Props) {
  const name = (await params).name;
  const year = Number((await params).year);
  const task = await getTask(year, name);
  const scores = await getTaskTaskScores(year, name);

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
        {scores.map((score) => (
          <TableRow key={score.userId}>
            <div>{score.rank ?? "N/A"}</div>
            <div>
              <Link href={`/contestant/${score.userId}`} className="link">
                {score.firstName} {score.lastName}
              </Link>
            </div>
            <div>
              <Score
                score={score.score}
                maxScore={task.maxScorePossible}
                className="w-16 mx-auto"
              />
            </div>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
