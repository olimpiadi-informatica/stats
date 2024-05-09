import { getUsers } from "~/lib/users";

const CHUNK_SIZE = 50;

type Params = { id: string };

export async function generateStaticParams() {
  const users = await getUsers();
  return Array.from(
    { length: Math.ceil(users.length / CHUNK_SIZE) + 1 },
    (_, id): Params => ({ id: id.toString() }),
  );
}

export async function GET(_request: Request, { params: { id } }: { params: Params }) {
  const all = await getUsers();
  return Response.json(all.slice(+id * CHUNK_SIZE, (+id + 1) * CHUNK_SIZE));
}
