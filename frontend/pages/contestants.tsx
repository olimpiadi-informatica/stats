import { Layout } from "components/layout/layout";
import Head from "next/head";
import commonStyles from "styles/common.module.scss";
import {
  getContestantList,
  ContestantList as ContestantListT,
} from "lib/remote/user";
import { ContestantList } from "components/contestantList/contestantList";

export default function Contestants({
  contestants,
}: {
  contestants: ContestantListT;
}) {
  return (
    <Layout>
      <Head>
        <title>OII Stats - Hall of Fame</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>Hall of Fame</h1>
      <ContestantList users={contestants} />
    </Layout>
  );
}

export async function getStaticProps() {
  const contestants = await getContestantList();
  return {
    props: {
      contestants,
    },
  };
}
