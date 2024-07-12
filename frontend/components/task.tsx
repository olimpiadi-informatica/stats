import type { StaticImageData } from "next/image";
import Link from "next/link";

import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";

import { Image } from "~/components/image";
import type { Task } from "~/lib/task";
import type { Tasks } from "~/lib/tasks";

export function TaskCard({ task, links }: { task: Task | Tasks[number]; links?: boolean }) {
  return (
    <Card className="h-full">
      <TaskImage
        name={task.name}
        year={task.contest_year}
        image={task.image}
        className="w-52 flex-none max-sm:mx-auto max-sm:mt-4 max-sm:rounded-box sm:min-h-52"
      />
      <CardBody title={task.title}>
        <div>
          <span className="font-semibold">Anno:</span>{" "}
          {links ? (
            <Link href={`/contest/${task.contest_year}`} className="link">
              {task.contest_year}
            </Link>
          ) : (
            task.contest_year
          )}
        </div>
        <div>
          <span className="font-semibold">Punteggio massimo:</span>{" "}
          {task.max_score_possible ?? "N/A"}
        </div>
        <div>
          <span className="font-semibold">Punteggio massimo totalizzato:</span>{" "}
          {task.max_score ?? "N/A"}
        </div>
        {links && task.link && (
          <div>
            <Link href={task.link} className="link">
              Prova questo problema
            </Link>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export function TaskImage({
  name,
  year,
  image,
  className,
}: {
  name: string;
  year: number;
  image: StaticImageData | null;
  className?: string;
}) {
  return image ? (
    <div className={clsx("relative grid overflow-hidden", className)}>
      <Image src={image} alt="" className="absolute inset-0 size-full object-cover max-sm:hidden" />
      <Image
        src={image}
        alt={`Problema ${name}`}
        className="m-auto size-full object-contain sm:backdrop-blur-lg"
      />
    </div>
  ) : (
    <div
      className={clsx(
        "flex aspect-square items-center justify-center bg-neutral p-4 text-center text-5xl font-bold text-neutral-content",
        className,
      )}>
      OII {year}
    </div>
  );
}
