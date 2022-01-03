import Head from "next/head";
import { Layout } from "components/layout/layout";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  getRegion,
  getRegionList,
  getRegionResults,
  RegionDetail,
  RegionResults,
} from "lib/remote/region";
import { Region } from "components/region/region";

type Props = {
  region: RegionDetail;
  results: RegionResults;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const regions = await getRegionList();
  return {
    paths: regions.regions.map((r) => ({ params: { id: r.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) return { notFound: true };
  const id = params.id as string;
  if (!id) return { notFound: true };

  const region = await getRegion(id);
  const results = await getRegionResults(id);

  return {
    props: {
      region,
      results,
    },
  };
};

export default function RegionPage({
  region,
  results,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>OII Stats - {region.name}</title>
      </Head>
      <Region region={region} results={results} />
    </Layout>
  );
}
