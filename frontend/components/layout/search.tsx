import styles from "./search.module.scss";

export function Search() {
  return (
    <div>
      <input className={styles.searchBar} />
      <button className={styles.searchBtn}>Search</button>
    </div>
  );
}
