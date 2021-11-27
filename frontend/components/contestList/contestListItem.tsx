import { ContestItem } from "lib/remote/contest";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import styles from "./contestListItem.module.scss";
import { Medals } from "components/medals/medals";
import { round } from "lib/round";

type Props = {
  contest: ContestItem;
};

export function ContestListItem({ contest }: Props) {
  const num_contestants = contest.num_contestants;
  const max_score_possible = contest.max_score_possible;
  const max_score = contest.max_score;
  const avg_score = contest.avg_score ? round(contest.avg_score, 2) : null;

  const medals = {
    gold: contest.medals.gold.number,
    silver: contest.medals.silver.number,
    bronze: contest.medals.bronze.number,
  };

  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <Link href={`/contest/${contest.year}`}>
          <a>
            <h2>
              {contest.location.location} {contest.year}
            </h2>
          </a>
        </Link>
      </div>
      <div className={styles.image}>
        <Link href={`/contest/${contest.year}`}>
          <a className={styles.imageWrapper}>
            <Image
              src={`/static/contests/${contest.year}.jpg`}
              alt={`Contest ${contest.year}`}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div className={styles.info}>
        <Row as="dl">
          {num_contestants && (
            <>
              <Col xs="9" as="dt">
                Contestants
              </Col>
              <Col xs="3" as="dd">
                {num_contestants}
              </Col>
            </>
          )}
          {max_score_possible && (
            <>
              <Col xs="9" as="dt">
                Maximum score possible
              </Col>
              <Col xs="3" as="dd">
                {max_score_possible}
              </Col>
            </>
          )}
          {max_score && (
            <>
              <Col xs="9" as="dt">
                Maximum score
              </Col>
              <Col xs="3" as="dd">
                {max_score}
              </Col>
            </>
          )}
          {avg_score && (
            <>
              <Col xs="9" as="dt">
                Average score
              </Col>
              <Col xs="3" as="dd">
                {avg_score}
              </Col>
            </>
          )}
        </Row>
      </div>
      <div className={styles.medals}>
        <Medals medals={medals} />
      </div>
    </div>
  );
}
