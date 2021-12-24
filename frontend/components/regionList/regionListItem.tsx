import { RegionItem } from "lib/remote/region";
import styles from "./regionListItem.module.scss";
import Link from "next/link";
import { useState } from "react";
import { RegionInfo } from "components/region/regionInfo";
import { Medals } from "components/medals/medals";

export function RegionListItem({ region }: { region: RegionItem }) {
  const [imgOk, setImgOk] = useState<boolean>(true);
  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <Link href={`/region/${region.id}`}>
          <a>
            <h2>{region.name}</h2>
          </a>
        </Link>
      </div>
      {imgOk && (
        <div className={styles.image}>
          <Link href={`/region/${region.id}`}>
            <a>
              <img
                src={`/static/regions/${region.id}.svg`}
                alt={region.id}
                onError={() => setImgOk(false)}
              />
            </a>
          </Link>
        </div>
      )}
      <div className={styles.info}>
        <RegionInfo region={region} />
      </div>
      <div className={styles.medals}>
        <Medals medals={region.medals} />
      </div>
    </div>
  );
}
