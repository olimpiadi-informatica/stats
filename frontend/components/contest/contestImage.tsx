import { Image } from "components/image/image";

export function ContestImage({ year }: { year: number }) {
  return <Image path={`contests/${year}.jpg`} alt={`Contest ${year}`} />;
}
