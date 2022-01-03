import { ContestLocation } from "./contest";
import {
  Contestant,
  NumMedals,
  Medal,
  loadJSON,
  International,
} from "./common";

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
  internationals: International[];
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

export async function getRegionList(): Promise<RegionList> {
  return await loadJSON("regions.json");
}

export async function getRegion(id: string): Promise<RegionDetail> {
  return await loadJSON(`regions/${id}.json`);
}

export async function getRegionResults(id: string): Promise<RegionResults> {
  return await loadJSON(`regions/${id}/results.json`);
}
