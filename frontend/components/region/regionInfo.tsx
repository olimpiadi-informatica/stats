import { RegionItem } from "lib/remote/region";
import { round } from "lib/round";
import { Row, Col } from "react-bootstrap";

export function RegionInfo({ region }: { region: RegionItem }) {
  return (
    <Row as="dl">
      <Col xs="9" as="dt">
        Contestants
      </Col>
      <Col xs="3" as="dd">
        {region.num_contestants}
      </Col>
      <Col xs="9" as="dt">
        Average number of contestants per year
      </Col>
      <Col xs="3" as="dd">
        {round(region.avg_contestants_per_year, 2)}
      </Col>
    </Row>
  );
}
