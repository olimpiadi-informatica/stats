import { ContestInfoTask } from "lib/remote/contest";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";

export function TaskInfo({ task }: { task: ContestInfoTask }) {
  return (
    <Row as="dl">
      <Col xs="9" sm="6" lg="3" as="dt">
        Year
      </Col>
      <Col xs="3" as="dd">
        {task.contest_year}
      </Col>
      <Col xs="9" sm="6" lg="3" as="dt">
        Try this problem
      </Col>
      <Col xs="3" as="dd">
        {task.link ? (
          <a href={task.link} target="_blank" rel="noreferrer">
            Link
          </a>
        ) : (
          <em>Not available yet</em>
        )}
      </Col>
      {task.max_score_possible && (
        <>
          <Col xs="9" sm="6" lg="3" as="dt">
            Maximum score possible
          </Col>
          <Col xs="3" as="dd">
            {task.max_score_possible}
          </Col>
        </>
      )}
      {task.max_score && (
        <>
          <Col xs="9" sm="6" lg="3" as="dt">
            Maximum score
          </Col>
          <Col xs="3" as="dd">
            {task.max_score}
          </Col>
        </>
      )}
    </Row>
  );
}
