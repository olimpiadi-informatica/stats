import React from "react";
import styles from "./layout.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./search";

type Props = {
  children: React.ReactFragment;
};

export function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <div>
        <Link href={"/"}>
          <a>
            <Image
              src={"/images/oiistats.png"}
              alt="OII Stats"
              width={190}
              height={50}
            />
          </a>
        </Link>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.navbarLink}>
          <Link href="/">Home</Link>
        </div>
        <div className={styles.navbarLink}>
          <Link href="/contests">Contests</Link>
        </div>
        <div className={styles.navbarLink}>
          <Link href="/contestants">Hall of Fame</Link>
        </div>
        <div className={styles.navbarLink}>
          <Link href="/regions">Regions</Link>
        </div>
        <div className={styles.navbarLink}>
          <Link href="/tasks">Tasks</Link>
        </div>
        <div className={styles.navbarLink}>
          <Link href="/contribute">Contribute</Link>
        </div>
        <div className={styles.navbarLink}>
          <Link href="/about">About</Link>
        </div>
        <div>
          <Search />
        </div>
      </nav>
      {children}
    </div>
  );
}
