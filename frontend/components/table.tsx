import type { ReactNode } from "react";

import clsx from "clsx";

export function Table({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className="max-xl:w-screen max-xl:-translate-x-4 max-xl:overflow-x-auto max-xl:px-4">
      <div
        className={clsx(
          "grid min-w-fit items-center gap-x-4 gap-y-2 text-nowrap rounded-box border border-base-content/10 bg-base-200 shadow-xl p-4",
          className,
        )}>
        {children}
      </div>
    </div>
  );
}

export function TableHeaders({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-full grid grid-cols-subgrid items-center px-2 *:text-sm *:font-bold *:opacity-60">
      {children}
    </div>
  );
}

export function TableRow({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-full grid grid-cols-subgrid items-center rounded-btn p-2 hover:bg-base-content/10">
      {children}
    </div>
  );
}
