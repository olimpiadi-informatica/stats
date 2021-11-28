import { ContestBase } from "lib/remote/contest";
import { round } from "lib/round";
import { Row, Col } from "react-bootstrap";

export function ContestInfo({ contest }: { contest: ContestBase }) {
  const avg_score = contest.avg_score ? round(contest.avg_score, 2) : null;
  return (
    <Row as="dl">
      {contest.num_contestants && (
        <>
          <Col xs="9" as="dt">
            Contestants
          </Col>
          <Col xs="3" as="dd">
            {contest.num_contestants}
          </Col>
        </>
      )}
      {contest.max_score_possible && (
        <>
          <Col xs="9" as="dt">
            Maximum score possible
          </Col>
          <Col xs="3" as="dd">
            {contest.max_score_possible}
          </Col>
        </>
      )}
      {contest.max_score && (
        <>
          <Col xs="9" as="dt">
            Maximum score
          </Col>
          <Col xs="3" as="dd">
            {contest.max_score}
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
  );
}
