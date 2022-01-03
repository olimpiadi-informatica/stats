import Head from "next/head";
import React from "react";
import styles from "./layout.module.scss";
import { Container } from "react-bootstrap";
import { Navbar } from "./navbar";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  const router = useRouter();
  return (
    <Container className={styles.container}>
      <Head>
        <title>OII Stats</title>
        <meta
          name="description"
          content="OII stats is a platform that was created to provide essential but reliable statistics on the progress of the national competitions of the Italian IT Olympics."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/images/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/#${Math.floor(Math.random() * 100000)}`);
          }}
        >
          <img
            src={"/images/oiistats.png"}
            alt="OII Stats"
            width={190}
            height={50}
          />
        </a>
      </div>
      <Navbar />
      {children}
    </Container>
  );
}
