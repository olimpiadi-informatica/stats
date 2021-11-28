/* eslint-disable @next/next/no-img-element */
import { RegionDetail, RegionResults } from "lib/remote/region";
import { useState } from "react";
import styles from "./region.module.scss";
import commonStyles from "styles/common.module.scss";
import { Tab, Tabs } from "react-bootstrap";
import { Participations } from "./participations";
import { Results } from "./results";

type Props = {
  region: RegionDetail;
  results: RegionResults;
};

export function Region({ region, results }: Props) {
  const [imgOk, setImgOk] = useState<boolean>(true);

  return (
    <div className={styles.layout}>
      <h1 className={`${commonStyles.pageHeader} ${styles.title}`}>
        {region.name}
      </h1>
      <div className={styles.logo}>
        {imgOk && (
          <img
            src={`/static/regions/${region.navigation.current}.svg`}
            alt={region.name}
            onError={() => setImgOk(false)}
          />
        )}
      </div>
      <div className={styles.nav}>
        <Tabs defaultActiveKey="participations">
          <Tab eventKey="participations" title="Participations">
            <Participations region={region} />
          </Tab>
          <Tab eventKey="results" title="Results">
            <Results results={results} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
