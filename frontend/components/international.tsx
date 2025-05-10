import Link from "next/link";

import { type International, getInternational } from "~/lib/internationals";

export default async function InternationalBadge({ code }: { code: string }) {
  const international = await getInternational(code);
  return (
    <div
      className="badge mx-0.5 text-white"
      style={{ backgroundColor: international.color ?? undefined }}>
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
