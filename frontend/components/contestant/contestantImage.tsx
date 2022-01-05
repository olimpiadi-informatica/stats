import { Contestant } from "lib/remote/common";

const requireImage = (require as any).context(
  "public/static/contestants?resize&sizes[]=125&sizes[]=250",
  false,
  /\.jpg$/
);
const requireImageWebp = (require as any).context(
  "public/static/contestants?resize&sizes[]=125&sizes[]=250&format=webp",
  false,
  /\.jpg$/
);

export function ContestantImage({ contestant }: { contestant: Contestant }) {
  let src = null;
  let srcWebp = null;
  try {
    src = requireImage(`./${contestant.id}.jpg`);
    srcWebp = requireImageWebp(`./${contestant.id}.jpg`);
  } catch {
    return null;
  }
  return (
    <picture>
      <source srcSet={srcWebp.srcSet} type="image/webp" />
      <source srcSet={src.srcSet} type="image/jpeg" />
      <img
        src={src.src}
        alt={`${contestant.first_name} ${contestant.last_name}`}
      />
    </picture>
  );
}
