import styles from "./search.module.scss";
import { FormControl, Button } from "react-bootstrap";

export function Search() {
  return (
    <div>
      <FormControl placeholder="Search" className={styles.searchBar} />
      <Button className={styles.searchBtn} variant="outline-success">
        Search
      </Button>
    </div>
  );
}
