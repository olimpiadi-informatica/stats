import { ContestLocation } from "./contest";
import { ROOT_URL, Contestant, NumMedals } from "./common";

export type RegionItem = {
  id: string;
  name: string;
  num_contestants: number;
  medals: NumMedals;
  avg_contestants_per_year: number;
  hosted: number[];
};

type RegionDetailYear = {
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

type RegionResultsYearContestantTask = {
  name: string;
  score: number | null;
  max_score_possible: number | null;
};

type RegionResultsYearContestant = {
  contestant: Contestant;
  ioi: boolean;
  rank: number | null;
  medal: "gold" | "silver" | "bronze" | null;
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

// async function loadRegionsList(): Promise<RegionItem[]> {
//   return axios.get(`${ROOT_URL}/regions`).then(res => {
//     return res.data.regions;
//   });
// }

// async function loadRegionDetail(id: string): Promise<RegionDetail> {
//   return axios.get(`${ROOT_URL}/regions/${id}`).then(res => {
//     return res.data;
//   });
// }

// async function loadRegionResults(id: string): Promise<RegionResults> {
//   return axios.get(`${ROOT_URL}/regions/${id}/results`).then(res => {
//     return res.data;
//   });
// }

// export {
//   RegionItem,
//   RegionDetail,
//   RegionResults,
//   RegionResultsYear,
//   loadRegionsList,
//   loadRegionDetail,
//   loadRegionResults,
// };
