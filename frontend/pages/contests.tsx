import Head from "next/head";
import { ContestList } from "components/contestList/contestList";
import { Layout } from "components/layout/layout";
import {
  ContestList as ContestListT,
  getContestList,
} from "lib/remote/contest";
import commonStyles from "styles/common.module.scss";

export default function Contests({ contests }: { contests: ContestListT }) {
  return (
    <Layout>
      <Head>
        <title>OII Stats - Contests</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>Contests</h1>
      <ContestList contests={contests} />
    </Layout>
  );
}

export async function getStaticProps() {
  const contests = await getContestList();
  return {
    props: {
      contests,
    },
  };
}
