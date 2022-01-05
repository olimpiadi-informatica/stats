import { Image } from "components/image/image";

type Props = {
  contest_year: number;
  name: string;
};

export function TaskImage({ contest_year, name }: Props) {
  return (
    <Image
      path={`tasks/${contest_year}/${name}.png`}
      alt={`${name} (${contest_year})`}
    />
  );
}
