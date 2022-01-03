import { Layout } from "components/layout/layout";
import { getStats, Stats } from "lib/remote/home";
import { RegionTile } from "components/home/region";
import { TilesContainer } from "components/home/tilesContainer";
import { sample, shuffle } from "lib/random";
import { UserTile } from "components/home/user";
import { TaskTile } from "components/home/task";
import { ContestTile } from "components/home/contest";

const HomeInner = ({ home }: { home: Stats }) => {
  const tiles = [];
  for (const stat of sample(home.region, 2)) {
    tiles.push(<RegionTile key={JSON.stringify(stat)} stat={stat} />);
  }
  for (const stat of sample(home.user, 2)) {
    tiles.push(<UserTile key={JSON.stringify(stat)} stat={stat} />);
  }
  for (const stat of sample(home.task, 2)) {
    tiles.push(<TaskTile key={JSON.stringify(stat)} stat={stat} />);
  }
  for (const stat of sample(home.contest, 2)) {
    tiles.push(<ContestTile key={JSON.stringify(stat)} stat={stat} />);
  }
  shuffle(tiles);

  return (
    <>
      <TilesContainer tiles={tiles} />
    </>
  );
};

export default function Home({ home }: { home: Stats }) {
  return (
    <Layout>
      <HomeInner home={home} />
    </Layout>
  );
}

export async function getStaticProps() {
  const home = await getStats();
  return {
    props: {
      home,
    },
  };
}
