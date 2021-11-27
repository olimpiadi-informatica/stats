import React from "react";
import styles from "./layout.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { Navbar } from "./navbar";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <Container className={styles.container}>
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
      <Navbar />
      {children}
    </Container>
  );
}
