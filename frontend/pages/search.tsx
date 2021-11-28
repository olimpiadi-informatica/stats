import { Layout } from "components/layout/layout";
import { Loading } from "components/loading/loading";
import { Error } from "components/error/error";
import { useSearchResults } from "lib/remote/search";
import Head from "next/head";
import { useRouter } from "next/router";
import commonStyles from "styles/common.module.scss";
import { SearchResults } from "components/search/searchResults";

export default function SearchPage() {
  const router = useRouter();
  const q = (router.query.q as string) ?? "";
  const { data, isLoading, isError } = useSearchResults(q);

  return (
    <Layout>
      <Head>
        <title>OII Stats - Search</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>
        Search results for &quot;{q}&quot;
      </h1>
      {isLoading && <Loading />}
      {isError && <Error error={isError} />}
      {data && <SearchResults results={data} />}
    </Layout>
  );
}
