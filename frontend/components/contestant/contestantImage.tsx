import { Image } from "components/image/image";
import { Contestant } from "lib/remote/common";

export function ContestantImage({ contestant }: { contestant: Contestant }) {
  return (
    <Image
      path={`contestants/${contestant.id}.jpg`}
      alt={`${contestant.first_name} ${contestant.last_name}`}
    />
  );
}
