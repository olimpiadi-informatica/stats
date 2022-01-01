import styles from "./navigation.module.scss";
import commonStyles from "styles/common.module.scss";
import Link from "next/link";

type Props<T> = {
  navigation: {
    previous: T | null;
    next: T | null;
  };
  title: string;
  genLink: (item: T) => string;
  genTitle?: (item: T) => string;
};

export function Navigation<T>({
  navigation,
  title,
  genLink,
  genTitle,
}: Props<T>) {
  const genTitleFn = genTitle ? genTitle : (item: T) => item;
  return (
    <div className={styles.navigation}>
      <h1 className={commonStyles.pageHeader}>{title}</h1>
      <div className={styles.previous}>
        {navigation.previous !== null && (
          <Link href={genLink(navigation.previous)}>
            <a>← {genTitleFn(navigation.previous)}</a>
          </Link>
        )}
      </div>
      <div className={styles.next}>
        {navigation.next !== null && (
          <Link href={genLink(navigation.next)}>
            <a>{genTitleFn(navigation.next)} →</a>
          </Link>
        )}
      </div>
    </div>
  );
}
