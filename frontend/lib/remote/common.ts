export type Contestant = {
  id: string;
  first_name: string | null;
  last_name: string;
};

export type NumMedals = {
  gold: number;
  silver: number;
  bronze: number;
};

export const ROOT_URL =
  process.env.NEXT_PUBLIC_API_BASE_URI || "https://stats.olinfo.it/api";

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export type Loadable<T> = {
  data: T;
  isLoading: boolean;
  isError: boolean;
};
