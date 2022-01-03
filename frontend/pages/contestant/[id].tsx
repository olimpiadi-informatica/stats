import { Contestant } from "components/contestant/contestant";
import { Layout } from "components/layout/layout";
import {
  ContestantDetail,
  getContestant,
  getContestantList,
} from "lib/remote/user";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  contestant: ContestantDetail;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contestants = await getContestantList();
  return {
    paths: contestants.users.map((c) => ({ params: { id: c.contestant.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) return { notFound: true };
  const id = params.id as string;
  if (!id) return { notFound: true };

  const contestant = await getContestant(id);

  return {
    props: {
      contestant,
    },
  };
};

export default function ContestantPage({ contestant }: Props) {
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
