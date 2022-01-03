import Head from "next/head";
import { Layout } from "components/layout/layout";
import {
  ContestDetail,
  ContestResults,
  getContest,
  getContestList,
  getContestResults,
} from "lib/remote/contest";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Contest } from "components/contest/contest";

type Props = {
  year: number;
  contest: ContestDetail;
  results: ContestResults;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contests = await getContestList();
  return {
    paths: contests.contests.map((c) => ({
      params: { year: c.year.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) return { notFound: true };
  const contestYear = parseInt(params.year as string, 10);
  if (Number.isNaN(contestYear)) return { notFound: true };

  const contest = await getContest(contestYear);
  const results = await getContestResults(contestYear);

  return {
    props: {
      year: contestYear,
      contest,
      results,
    },
  };
};

export default function ContestYear({
  contest,
  results,
  year,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>
          OII Stats - {contest.location.location} {year}
        </title>
      </Head>
      <Contest year={year} contest={contest} results={results} />
    </Layout>
  );
}
