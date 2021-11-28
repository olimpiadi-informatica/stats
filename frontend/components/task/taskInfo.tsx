import { ContestInfoTask } from "lib/remote/contest";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { TaskDetail } from "lib/remote/task";

export function TaskInfo({ task }: { task: ContestInfoTask | TaskDetail }) {
  return (
    <Row as="dl">
      <Col xs="9" sm="6" lg="3" as="dt">
        Year
      </Col>
      <Col xs="3" as="dd">
        <Link href={`/contest/${task.contest_year}`}>
          <a>{task.contest_year}</a>
        </Link>
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
      {"max_score" in task && task.max_score && (
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
