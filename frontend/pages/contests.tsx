import { ContestList } from "components/contestList/contestList";
import { Error } from "components/error/error";
import { Layout } from "components/layout/layout";
import { Loading } from "components/loading/loading";
import { useContestList } from "lib/remote/contest";
import commonStyles from "styles/common.module.scss";

export default function Contests() {
  const { data, isLoading, isError } = useContestList();
  return (
    <Layout>
      <h1 className={commonStyles.pageHeader}>Contests</h1>
      {isLoading && <Loading />}
      {isError && <Error error={isError} />}
      {data && <ContestList contests={data} />}
    </Layout>
  );
}
