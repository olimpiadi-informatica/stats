import { Metadata } from "next";

import { getUsers } from "~/lib/users";

import { ContestantGrid } from "./contestant-grid";

export const metadata: Metadata = {
  title: "OII Stats - Hall of Fame",
  description: "Statistiche e classifiche delle Olimpiadi Italiane di Informatica",
};

const CHUNK_SIZE = 50;

export default async function Page() {
  const all = await getUsers();
  const users = all.slice(0, CHUNK_SIZE);

  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">Hall of Fame</h1>
      <ContestantGrid firstChunk={users} />
    </>
  );
}
