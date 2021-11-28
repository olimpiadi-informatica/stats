import { Layout } from "components/layout/layout";
import { Loading } from "components/loading/loading";
import { useRegionList } from "lib/remote/region";
import { Error } from "components/error/error";
import Head from "next/head";
import commonStyles from "styles/common.module.scss";
import { RegionList } from "components/regionList/regionList";

export default function Regions() {
  const { data, isLoading, isError } = useRegionList();
  return (
    <Layout>
      <Head>
        <title>OII Stats - Regions</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>Regions</h1>
      {isLoading && <Loading />}
      {isError && <Error error={isError} />}
      {data && <RegionList regions={data} />}
    </Layout>
  );
}
