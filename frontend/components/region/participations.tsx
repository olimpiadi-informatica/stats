/* eslint-disable @next/next/no-img-element */
import { RegionDetail, RegionDetailYear } from "lib/remote/region";
import { ListGroup } from "react-bootstrap";
import Link from "next/link";
import styles from "./participations.module.scss";
import { useState } from "react";
import { Medals } from "components/medals/medals";
import { Row, Col } from "react-bootstrap";

function ParticipationInfo({ year }: { year: RegionDetailYear }) {
  return (
    <Row as="dl">
      <Col xs="9" as="dt">
        Contestants
      </Col>
      <Col xs="3" as="dd">
        {year.num_contestants}
      </Col>
    </Row>
  );
}

function ParticipationItem({ year }: { year: RegionDetailYear }) {
  const [imgOk, setImgOk] = useState<boolean>(true);
  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <Link href={`/contest/${year.year}`}>
          <a>
            {year.location.location} {year.year}
          </a>
        </Link>
      </div>
      {imgOk && (
        <div className={styles.image}>
          <Link href={`/contest/${year.year}`}>
            <a>
              <img
                src={`/static/contests/${year.year}.jpg`}
                alt={`${year.location.location} ${year.year}`}
                onError={() => setImgOk(false)}
              />
            </a>
          </Link>
        </div>
      )}
      <div className={styles.info}>
        <ParticipationInfo year={year} />
      </div>
      <div className={styles.medals}>
        <Medals medals={year.num_medals} />
      </div>
    </div>
  );
}

export function Participations({ region }: { region: RegionDetail }) {
  return (
    <ListGroup variant="flush">
      {region.years.map((year) => (
        <ListGroup.Item key={year.year}>
          <ParticipationItem year={year} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
