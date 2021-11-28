import { ContestBase } from "lib/remote/contest";
import { MedalIcon } from "./medalIcon";
import styles from "./medals.module.scss";

type MedalValue = number | null;
type MedalValues = { gold: MedalValue; silver: MedalValue; bronze: MedalValue };

type Props = {
  contest?: ContestBase;
  showCutoffs?: boolean;
  medals?: MedalValues;
};

type PropsInner = {
  medals: MedalValues;
  cutoffs?: MedalValues;
  showCutoffs?: boolean;
};

function MedalsInner({ medals, cutoffs, showCutoffs }: PropsInner) {
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

export function Medals({ contest, showCutoffs, medals }: Props) {
  if (medals) {
    return <MedalsInner medals={medals} />;
  }
  if (contest) {
    const medals = {
      gold: contest.medals.gold.number,
      silver: contest.medals.silver.number,
      bronze: contest.medals.bronze.number,
    };
    const cutoffs = {
      gold: contest.medals.gold.cutoff,
      silver: contest.medals.silver.cutoff,
      bronze: contest.medals.bronze.cutoff,
    };
    return (
      <MedalsInner
        medals={medals}
        cutoffs={cutoffs}
        showCutoffs={showCutoffs}
      />
    );
  }

  throw new Error("Provide euther contest or medals");
}
