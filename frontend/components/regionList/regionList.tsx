import { RegionList } from "lib/remote/region";
import { ListGroup } from "react-bootstrap";
import { RegionListItem } from "./regionListItem";

export function RegionList({ regions }: { regions: RegionList }) {
  return (
    <ListGroup variant="flush">
      {regions.regions.map((region) => (
        <ListGroup.Item key={region.id}>
          <RegionListItem region={region} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
