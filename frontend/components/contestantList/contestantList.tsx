import { ContestantList } from "lib/remote/user";
import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { ContestantListItem } from "./contestantListItem";
import styles from "./contestantList.module.scss";

type Props = {
  users: ContestantList;
};

const ITEMS_PER_PAGE = 20;

export function ContestantList({ users }: Props) {
  const [numPages, setNumPages] = useState<number>(1);

  return (
    <>
      <ListGroup variant="flush">
        {users.users.slice(0, ITEMS_PER_PAGE * numPages).map((user) => (
          <ListGroup.Item key={user.contestant.id}>
            <ContestantListItem user={user} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button
        variant="outline-secondary"
        onClick={() => setNumPages(numPages + 1)}
        className={styles.loadMore}
      >
        Load more
      </Button>
    </>
  );
}
