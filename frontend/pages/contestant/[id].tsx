import { Contestant } from "components/contestant/contestant";
import { Layout } from "components/layout/layout";
import { Error } from "lib/remote/common";
import { ContestantDetail, loadContestant } from "lib/remote/user";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  contestant: ContestantDetail | Error;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) return { notFound: true };
  const id = params.id as string;
  if (!id) return { notFound: true };

  const contestant = await loadContestant(id);

  return {
    props: {
      contestant,
    },
  };
};

export default function ContestantPage({ contestant }: Props) {
  if ("error" in contestant) {
    return (
      <Layout>
        <p>{contestant.error}</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>
        <title>
          OII Stats - {contestant.contestant.first_name}{" "}
          {contestant.contestant.last_name}
        </title>
      </Head>
      <Contestant contestant={contestant} />
    </Layout>
  );
}
