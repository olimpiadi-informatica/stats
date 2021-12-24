import Head from "next/head";
import React from "react";
import styles from "./layout.module.scss";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { Navbar } from "./navbar";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <Container className={styles.container}>
      <Head>
        <title>OII Stats</title>
        <meta
          name="description"
          content="OII stats is a platform that was created to provide essential but reliable statistics on the progress of the national competitions of the Italian IT Olympics."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Link href={"/"}>
          <a>
            <img
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
