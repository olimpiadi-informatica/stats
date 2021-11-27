import Head from "next/head";
import { Layout } from "components/layout/layout";
import { Stats, useStats } from "lib/remote/home";
import { Loadable } from "lib/remote/common";
import { Loading } from "components/loading/loading";
import { Error } from "components/error/error";
import { RegionTile } from "components/home/region";
import { TilesContainer } from "components/home/tilesContainer";
import { sample, shuffle } from "lib/random";
import { UserTile } from "components/home/user";

const HomeInner = ({ data, isLoading, isError }: Loadable<Stats>) => {
  if (isError) return <Error error={isError} />;
  if (isLoading) return <Loading />;

  const tiles = [];
  for (const stat of sample(data.region, 2)) {
    tiles.push(<RegionTile key={JSON.stringify(stat)} stat={stat} />);
  }
  for (const stat of sample(data.user, 2)) {
    tiles.push(<UserTile key={JSON.stringify(stat)} stat={stat} />);
  }
  shuffle(tiles);

  return (
    <>
      <TilesContainer tiles={tiles} />
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </>
  );
};

export default function Home() {
  const { data, isLoading, isError } = useStats();

  return (
    <Layout>
      <Head>
        <title>OII Stats</title>
        <meta
          name="description"
          content="OII stats is a platform that was created to provide essential but reliable statistics on the progress of the national competitions of the Italian IT Olympics."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeInner data={data} isLoading={isLoading} isError={isError} />
    </Layout>
  );
}
