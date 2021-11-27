import { Row, Col } from "react-bootstrap";
import styles from "./tilesContainer.module.scss";

type Props = {
  tiles: React.ReactNode[];
};

export function TilesContainer({ tiles }: Props) {
  return (
    <Row>
      <Col md="12">
        <div className={styles.container}>{tiles}</div>
      </Col>
    </Row>
  );
}
