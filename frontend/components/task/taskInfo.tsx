import { ContestInfoTask } from "lib/remote/contest";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";

export function TaskInfo({ task }: { task: ContestInfoTask }) {
  return (
    <Row as="dl">
      <Col sm="6" as="dt">
        Year
      </Col>
      <Col sm="6" as="dd">
        {task.contest_year}
      </Col>
      <Col sm="6" as="dt">
        Try this problem
      </Col>
      <Col sm="6" as="dd">
        {task.link ? (
          <a href={task.link} target="_blank" rel="noreferrer">
            {task.link}
          </a>
        ) : (
          <em>Not available yet</em>
        )}
      </Col>
      {task.max_score_possible && (
        <>
          <Col sm="6" as="dt">
            Maximum score possible
          </Col>
          <Col sm="6" as="dd">
            {task.max_score_possible}
          </Col>
        </>
      )}
      {task.max_score && (
        <>
          <Col sm="6" as="dt">
            Maximum score
          </Col>
          <Col sm="6" as="dd">
            {task.max_score}
          </Col>
        </>
      )}
    </Row>
  );
}
