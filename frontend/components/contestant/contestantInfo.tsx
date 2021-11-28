import { ContestantDetail, ContestantItem } from "lib/remote/user";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import style from "./contestantInfo.module.scss";
import { MedalIcon } from "components/medals/medalIcon";

export function ContestantInfo({
  contestant,
}: {
  contestant: ContestantItem | ContestantDetail;
}) {
  return (
    <Row as="dl">
      {"best_rank" in contestant && contestant.best_rank && (
        <>
          <Col xs="6" lg="6" as="dt">
            Best rank
          </Col>
          <Col xs="6" as="dd">
            {contestant.best_rank}
          </Col>
        </>
      )}
      <Col xs="6" lg="6" as="dt">
        Participations
      </Col>
      <Col xs="6" as="dd">
        {contestant.participations.map((part) => (
          <div key={part.year}>
            <Link href={`/contest/${part.year}`}>
              <a>{part.year}</a>
            </Link>
            {part.medal && (
              <>
                {" "}
                <MedalIcon className={style.medal} color={part.medal} />
              </>
            )}
          </div>
        ))}
      </Col>
    </Row>
  );
}
