import Head from "next/head";
import { Layout } from "components/layout/layout";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Error } from "lib/remote/common";
import {
  loadRegion,
  loadRegionResults,
  RegionDetail,
  RegionResults,
} from "lib/remote/region";
import { Region } from "components/region/region";

type Props = {
  region: RegionDetail | Error;
  results: RegionResults | Error;
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

  const region = await loadRegion(id);
  const results = await loadRegionResults(id);

  return {
    props: {
      region,
      results,
    },
    revalidate: 3600,
  };
};

export default function RegionPage({
  region,
  results,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if ("error" in region) {
    return (
      <Layout>
        <p>{region.error}</p>
      </Layout>
    );
  }
  if ("error" in results) {
    return (
      <Layout>
        <p>{results.error}</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>
        <title>OII Stats - {region.name}</title>
      </Head>
      <Region region={region} results={results} />
    </Layout>
  );
}
