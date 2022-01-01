import styles from "./navigation.module.scss";
import commonStyles from "styles/common.module.scss";
import Link from "next/link";

type Props = {
  navigation: {
    previous: any | null;
    next: any | null;
  };
  title: string;
  linkPrefix: string;
};

export function Navigation({ navigation, title, linkPrefix }: Props) {
  return (
    <div className={styles.navigation}>
      <h1 className={commonStyles.pageHeader}>{title}</h1>
      <div className={styles.previous}>
        {navigation.previous !== null && (
          <Link href={`${linkPrefix}/${navigation.previous}`}>
            <a>← {navigation.previous}</a>
          </Link>
        )}
      </div>
      <div className={styles.next}>
        {navigation.next !== null && (
          <Link href={`${linkPrefix}/${navigation.next}`}>
            <a>{navigation.next} →</a>
          </Link>
        )}
      </div>
    </div>
  );
}
