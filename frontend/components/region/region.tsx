import { RegionDetail, RegionResults } from "lib/remote/region";
import { useState } from "react";
import styles from "./region.module.scss";
import commonStyles from "styles/common.module.scss";
import { Tab, Tabs } from "react-bootstrap";
import { Participations } from "./participations";
import { Results } from "./results";
import Link from "next/link";
import { Navigation } from "components/navigation/navigation";

type Props = {
  region: RegionDetail;
  results: RegionResults;
};

export function Region({ region, results }: Props) {
  const [imgOk, setImgOk] = useState<boolean>(true);

  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <Navigation
          navigation={results.navigation}
          title={region.name}
          linkPrefix="/region"
        />
      </div>
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
