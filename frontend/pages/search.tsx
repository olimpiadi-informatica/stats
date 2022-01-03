import { Layout } from "components/layout/layout";
import { getSearchIndex, search, Index } from "lib/remote/search";
import Head from "next/head";
import { useRouter } from "next/router";
import commonStyles from "styles/common.module.scss";
import { SearchResults } from "components/search/searchResults";

export default function SearchPage({ index }: { index: Index }) {
  const router = useRouter();
  const q = (router.query.q as string) ?? "";
  const results = search(index, q);

  return (
    <Layout>
      <Head>
        <title>OII Stats - Search</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>
        Search results for &quot;{q}&quot;
      </h1>
      <SearchResults results={results} />
    </Layout>
  );
}

export async function getStaticProps() {
  const index = await getSearchIndex();
  return {
    props: {
      index,
    },
  };
}
