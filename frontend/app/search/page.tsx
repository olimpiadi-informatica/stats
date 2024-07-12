"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

import { Form, SubmitButton, TextField } from "@olinfo/react-components";
import MiniSearch from "minisearch";
import useSWR from "swr";

import { Loading } from "~/components/placeholder";

import { SearchCard } from "./search";

export default function Page() {
  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold max-lg:hidden">Risultati ricerca</h1>
      <h1 className="text-center text-2xl font-bold lg:hidden">Ricerca</h1>
      <Form onSubmit={searchAction} className="mb-4 lg:hidden">
        <TextField
          field="q"
          label="Parola da cercare"
          placeholder="Inserisci la parola da cercare"
        />
        <div className="self-start px-1 text-sm text-base-content/60">
          Puoi cercare un partecipante, un problema o una gara
        </div>
        <SubmitButton className="!mt-2">Cerca</SubmitButton>
      </Form>
      <Suspense fallback={<Loading />}>
        <PageInner />
      </Suspense>
    </>
  );
}

function searchAction({ q }: { q: string }) {
  window.history.pushState({}, "", `/search?q=${q}`);
}

function PageInner() {
  const params = useSearchParams();

  const { data: search } = useSWR("search-index", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const query = params.get("q") ?? "";
  const results = useMemo(
    () => search?.search(query, { prefix: true, fuzzy: true }).slice(0, 20),
    [search, query],
  );

  if (!query) {
    return (
      <div className="m-8 text-center text-2xl text-base-content/60 max-lg:hidden">
        Usa la barra di ricerca per trovare un partecipante, un problema o una gara
      </div>
    );
  }
  if (!results) return <Loading />;
  if (results.length === 0) {
    return <div className="m-8 text-center text-2xl">Nessun risultato trovato</div>;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {results?.map((result) => (
        <SearchCard key={result.id} v={result.v} />
      ))}
    </div>
  );
}

async function fetcher() {
  const res = await fetch("/api/search");
  const index = await res.text();
  return MiniSearch.loadJSONAsync(index, { fields: ["k"], storeFields: ["v"] });
}
