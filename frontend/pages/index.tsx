import { Layout } from "components/layout/layout";
import { getStats, Stats } from "lib/remote/home";
import { RegionTile } from "components/home/region";
import { TilesContainer } from "components/home/tilesContainer";
import { sample, shuffle } from "lib/random";
import { UserTile } from "components/home/user";
import { TaskTile } from "components/home/task";
import { ContestTile } from "components/home/contest";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import seedrandom from "seedrandom";

const useSeed = () => {
  // A SSG-aware random seed that can be changed setting an hash argument.
  const [seed, setSeed] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const updateSeed = (url: string) => {
      const newSeed = url.split("#")[1];
      if (newSeed === undefined) return;
      setSeed(Number(newSeed));
      // remove # from the url
      window.history.replaceState("", "", location.pathname + location.search);
    };

    router.events.on("hashChangeComplete", updateSeed);
    return () => router.events.off("hashChangeComplete", updateSeed);
  }, [router, router.events]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100000));
  }, []);

  return seed;
};

const HomeInner = ({ home }: { home: Stats }) => {
  const seed = useSeed();
  const [tiles, setTiles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const random = seedrandom(seed.toString());

    const tiles = [];
    for (const stat of sample(random, home.region, 2)) {
      tiles.push(<RegionTile key={JSON.stringify(stat)} stat={stat} />);
    }
    for (const stat of sample(random, home.user, 2)) {
      tiles.push(<UserTile key={JSON.stringify(stat)} stat={stat} />);
    }
    for (const stat of sample(random, home.task, 2)) {
      tiles.push(<TaskTile key={JSON.stringify(stat)} stat={stat} />);
    }
    for (const stat of sample(random, home.contest, 2)) {
      tiles.push(<ContestTile key={JSON.stringify(stat)} stat={stat} />);
    }
    shuffle(random, tiles);
    setTiles(tiles);
  }, [home, seed]);

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
