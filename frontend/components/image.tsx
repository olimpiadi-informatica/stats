import type { ImageData } from "~/lib/image";

type Props = {
  src: ImageData;
  alt: string;
  className?: string;
};

export function Image({ src, alt, className }: Props) {
  return (
    <img
      src={src.src}
      srcSet={src.srcSet}
      width={src.width}
      height={src.height}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
}
