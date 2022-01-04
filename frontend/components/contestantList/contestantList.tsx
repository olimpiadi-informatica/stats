import { ContestantList } from "lib/remote/user";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { ContestantListItem } from "./contestantListItem";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  users: ContestantList;
};

const ITEMS_PER_PAGE = 20;

export function ContestantList({ users }: Props) {
  const [numPages, setNumPages] = useState<number>(1);

  const items = users.users.slice(0, ITEMS_PER_PAGE * numPages);
  const hasMore = ITEMS_PER_PAGE * numPages < users.users.length;

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={() => setNumPages(numPages + 1)}
      hasMore={hasMore}
      loader={null}
      endMessage={
        <p>
          Not bad, you scrolled through all {users.users.length} contestants!
        </p>
      }
    >
      <ListGroup variant="flush">
        {items.map((user) => (
          <ListGroup.Item key={user.contestant.id}>
            <ContestantListItem user={user} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </InfiniteScroll>
  );
}
