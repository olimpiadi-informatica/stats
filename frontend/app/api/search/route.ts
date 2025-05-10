import MiniSearch from "minisearch";

import {
  getContestSearchResults,
  getRegionSearchResults,
  getTaskSearchResults,
  getUserSearchResults,
} from "~/lib/search";

export const dynamic = "force-static";

export async function GET() {
  const miniSearch = new MiniSearch({ fields: ["k"], storeFields: ["v"] });

  miniSearch.addAll(await getContestSearchResults());
  miniSearch.addAll(await getRegionSearchResults());
  miniSearch.addAll(await getTaskSearchResults());
  for await (const results of getUserSearchResults()) {
    miniSearch.addAll(results);
  }

  return Response.json(miniSearch.toJSON());
}
