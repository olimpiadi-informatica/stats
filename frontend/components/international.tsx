import Link from "next/link";

import { International } from "~/lib/common";

export default function InternationalBadge({ international }: { international: International }) {
  return (
    <div className="badge mx-0.5 text-white" style={{ backgroundColor: international.color }}>
      {international.link ? (
        <Link href={international.link}>
          <BadgeInner international={international} />
        </Link>
      ) : (
        <BadgeInner international={international} />
      )}
    </div>
  );
}

function BadgeInner({ international }: { international: International }) {
  return <abbr title={international.name}>{international.code}</abbr>;
}
