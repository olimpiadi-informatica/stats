"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

import MiniSearch from "minisearch";
import useSWR from "swr";

import { Loading } from "~/components/placeholder";

import { SearchCard } from "./search";

export default function Page() {
  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">Risultati ricerca</h1>
      <Suspense fallback={<Loading />}>
        <PageInner />
      </Suspense>
    </>
  );
}

function PageInner() {
  const params = useSearchParams();

  const { data: search } = useSWR("search-index", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const results = useMemo(
    () => search?.search(params.get("q") ?? "", { prefix: true, fuzzy: true }).slice(0, 20),
    [search, params],
  );

  if (!results) return <Loading />;
  if (results.length === 0) {
    return <div className="mt-8 text-center text-2xl">Nessun risultato trovato</div>;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {results?.map((result) => <SearchCard key={result.id} v={result.v} />)}
    </div>
  );
}

async function fetcher() {
  const res = await fetch("/api/search");
  const index = await res.text();
  return MiniSearch.loadJSONAsync(index, { fields: ["k"], storeFields: ["v"] });
}
