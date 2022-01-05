type Props = {
  path: string;
  alt: string;
  className?: string;
};

const requireImage = (require as any).context(
  "../../../static/?resize&sizes[]=125&sizes[]=250&sizes[]=400",
  true,
  /\.(jpg|png)$/
);
const requireImageWebp = (require as any).context(
  "../../../static/?resize&sizes[]=125&sizes[]=250&sizes[]=400&format=webp",
  true,
  /\.(jpg|png)$/
);

export function Image({ path, alt, className }: Props) {
  let src = null;
  let srcWebp = null;
  try {
    src = requireImage(`./${path}`);
    srcWebp = requireImageWebp(`./${path}`);
  } catch {
    return null;
  }
  return (
    <picture>
      <source srcSet={srcWebp.srcSet} type="image/webp" />
      <source srcSet={src.srcSet} type="image/jpeg" />
      <img src={src.src} alt={alt} className={className} />
    </picture>
  );
}
