import { Layout } from "components/layout/layout";
import Head from "next/head";
import { Error } from "components/error/error";
import { Loading } from "components/loading/loading";
import commonStyles from "styles/common.module.scss";
import { useContestantList } from "lib/remote/user";
import { ContestantList } from "components/contestantList/contestantList";

export default function Contestants() {
  const { data, isLoading, isError } = useContestantList();
  return (
    <Layout>
      <Head>
        <title>OII Stats - Hall of Fame</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>Hall of Fame</h1>
      {isLoading && <Loading />}
      {isError && <Error error={isError} />}
      {data && <ContestantList users={data} />}
    </Layout>
  );
}
