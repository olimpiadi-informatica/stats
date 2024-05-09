"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import { SearchIcon } from "lucide-react";

export function Search() {
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${e.currentTarget.q.value}`);
  };

  return (
    <form role="search" className="join" action="/search" onSubmit={onSubmit}>
      <input
        className="input join-item input-bordered"
        name="q"
        type="search"
        placeholder="Cerca"
        aria-label="Parola da cercare"
        required
      />
      <button className="btn btn-outline join-item border-base-content/20" aria-label="Cerca">
        <SearchIcon />
      </button>
    </form>
  );
}
