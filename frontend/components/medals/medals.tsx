import { MedalIcon } from "./medalIcon";
import styles from "./medals.module.scss";

type MedalValue = number | null;
type MedalValues = { gold: MedalValue; silver: MedalValue; bronze: MedalValue };

type Props = {
  medals: MedalValues;
  cutoffs?: MedalValues;
  showCutoffs?: boolean;
};

export function Medals({ medals, cutoffs, showCutoffs }: Props) {
  return (
    <div className={styles.medals}>
      <div className={styles.medal}>
        <MedalIcon color="gold" />
        <div>{medals.gold || 0}</div>
        <div>{cutoffs && showCutoffs ? cutoffs.gold : ""}</div>
      </div>
      <div className={styles.medal}>
        <MedalIcon color="silver" />
        <div>{medals.silver || 0}</div>
        <div>{cutoffs && showCutoffs ? cutoffs.silver : ""}</div>
      </div>
      <div className={styles.medal}>
        <MedalIcon color="bronze" />
        <div>{medals.bronze || 0}</div>
        <div>{cutoffs && showCutoffs ? cutoffs.bronze : ""}</div>
      </div>
    </div>
  );
}
