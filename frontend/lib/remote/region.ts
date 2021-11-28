import { ContestLocation } from "./contest";
import {
  ROOT_URL,
  Contestant,
  Error,
  NumMedals,
  Medal,
  Loadable,
  fetcher,
} from "./common";
import useSWR from "swr";

export type RegionItem = {
  id: string;
  name: string;
  num_contestants: number;
  medals: NumMedals;
  avg_contestants_per_year: number;
  hosted: number[];
};

export type RegionDetailYear = {
  year: number;
  location: ContestLocation;
  num_contestants: number;
  num_medals: NumMedals;
};

type RegionNavigation = {
  current: string;
  previous: string;
  next: string;
};

export type RegionDetail = {
  name: string;
  navigation: RegionNavigation;
  years: RegionDetailYear[];
  hosted: number[];
};

export type RegionResultsYearContestantTask = {
  name: string;
  score: number | null;
  max_score_possible: number | null;
};

type RegionResultsYearContestant = {
  contestant: Contestant;
  ioi: boolean;
  rank: number | null;
  medal: Medal;
  task_scores: RegionResultsYearContestantTask[];
};

export type RegionResultsYear = {
  year: number;
  contestants: RegionResultsYearContestant[];
};

export type RegionResults = {
  navigation: RegionNavigation;
  results: RegionResultsYear[];
};

export type RegionList = {
  regions: RegionItem[];
};

export function useRegionList(): Loadable<RegionList> {
  const { data, error } = useSWR(`${ROOT_URL}/regions`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function loadRegion(id: string): Promise<RegionDetail | Error> {
  const res = await fetch(`${ROOT_URL}/regions/${id}`);
  return await res.json();
}

export async function loadRegionResults(
  id: string
): Promise<RegionResults | Error> {
  const res = await fetch(`${ROOT_URL}/regions/${id}/results`);
  return await res.json();
}
