import MiniSearch from "minisearch";

import { getSearchResults } from "~/lib/search";

export async function GET() {
  const miniSearch = new MiniSearch({ fields: ["k"], storeFields: ["v"] });
  const docs = await getSearchResults();
  await miniSearch.addAllAsync(docs);
  return Response.json(miniSearch.toJSON());
}
