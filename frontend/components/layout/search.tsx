import styles from "./search.module.scss";
import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

export function Search() {
  const [q, setQ] = useState<string>("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(q)}`);
      }}
      className={styles.search}
    >
      <FormControl
        placeholder="Search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </form>
  );
}
