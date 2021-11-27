import { ContestList } from "lib/remote/contest";
import { ListGroup } from "react-bootstrap";
import { ContestListItem } from "./contestListItem";

type Props = {
  contests: ContestList;
};

export function ContestList({ contests }: Props) {
  return (
    <ListGroup variant="flush">
      {contests.contests.map((contest) => (
        <ListGroup.Item key={contest.year}>
          <ContestListItem contest={contest} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
