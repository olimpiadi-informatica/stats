import { Layout } from "components/layout/layout";
import { getRegionList, RegionList as RegionListT } from "lib/remote/region";
import Head from "next/head";
import commonStyles from "styles/common.module.scss";
import { RegionList } from "components/regionList/regionList";

export default function Regions({ regions }: { regions: RegionListT }) {
  return (
    <Layout>
      <Head>
        <title>OII Stats - Regions</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>Regions</h1>
      <RegionList regions={regions} />
    </Layout>
  );
}

export async function getStaticProps() {
  const regions = await getRegionList();
  return {
    props: {
      regions,
    },
  };
}
