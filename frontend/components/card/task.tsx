"use client";

import Link from "next/link";

import { Card, CardBody } from "@olinfo/react-components";
import clsx from "clsx";
import { round } from "lodash-es";

import { Image } from "~/components/image";
import type { Task } from "~/lib/tasks";

export function TaskCard({ task, links }: { task: Task; links?: boolean }) {
  return (
    <Card className="h-full">
      <TaskImage
        task={task}
        className="w-52 flex-none max-sm:mx-auto max-sm:mt-4 max-sm:rounded-box sm:min-h-52"
      />
      <CardBody title={task.title}>
        <div>
          <span className="font-semibold">Anno:</span>{" "}
          {links ? (
            <Link href={`/contest/${task.contestYear}`} className="link">
              {task.contestYear}
            </Link>
          ) : (
            task.contestYear
          )}
        </div>
        <div>
          <span className="font-semibold">Punteggio massimo:</span> {task.maxScorePossible ?? "N/A"}
        </div>
        <div>
          <span className="font-semibold">Punteggio massimo totalizzato:</span>{" "}
          {task.maxScore == null ? "N/A" : round(task.maxScore, 1)}
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

export function TaskImage({ task, className }: { task: Task; className?: string }) {
  return task.image ? (
    <div className={clsx("relative grid overflow-hidden", className)}>
      <Image
        src={task.image}
        alt=""
        className="absolute inset-0 size-full object-cover max-sm:hidden"
      />
      <Image
        src={task.image}
        alt={`Problema ${task.name}`}
        className="m-auto size-full object-contain sm:backdrop-blur-lg"
      />
    </div>
  ) : (
    <div
      className={clsx(
        "flex aspect-square items-center justify-center bg-neutral p-4 text-center text-5xl font-bold text-neutral-content",
        className,
      )}>
      OII {task.contestYear}
    </div>
  );
}
