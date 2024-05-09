import { Card, CardBody } from "@olinfo/react-components";

import { Medals } from "~/components/medal";

export function CardPlaceholder() {
  return (
    <Card className="h-full">
      <div className="skeleton size-52 flex-none rounded-none max-sm:mx-auto max-sm:mt-4 max-sm:rounded-box" />
      <CardBody title={<span className="skeleton my-1 inline-block h-5 w-56" />}>
        <div className="skeleton my-1 h-4 w-48" />
        <div className="skeleton my-1 h-4 w-64" />
        <div className="mt-2">
          <Medals
            gold={<span className="skeleton inline-block h-4 w-5 translate-y-1/4 scale-y-150" />}
            silver={<span className="skeleton inline-block h-4 w-5 translate-y-1/4 scale-y-150" />}
            bronze={<span className="skeleton inline-block h-4 w-5 translate-y-1/4 scale-y-150" />}
          />
        </div>
      </CardBody>
    </Card>
  );
}

export function Loading() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <CardPlaceholder />
      <CardPlaceholder />
      <CardPlaceholder />
      <CardPlaceholder />
    </div>
  );
}
