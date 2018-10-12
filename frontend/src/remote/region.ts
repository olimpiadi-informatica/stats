import axios from "axios";

import { ContestLocation } from "./contest";
import { ROOT_URL, Contestant } from "./index";

class RegionItem {
  id!: string;
  name!: string;
  num_contestants!: number;
  medals!: {
    gold: number;
    silver: number;
    bronze: number;
  };
  avg_contestants_per_year!: number;
  hosted!: number[];
}

class RegionDetailYear {
  year!: number;
  location!: ContestLocation;
  num_contestants!: number;
  num_medals!: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

class RegionNavigation {
  current!: string;
  previous!: string;
  next!: string;
}

class RegionDetail {
  name!: string;
  navigation!: RegionNavigation;
  years!: RegionDetailYear[];
  hosted!: number[];
}

class RegionResultsYearContestantTask {
  name!: string;
  score!: number | null;
  max_score_possible!: number | null;
}

class RegionResultsYearContestant {
  contestant!: Contestant;
  ioi!: boolean;
  rank!: number | null;
  medal!: "gold" | "silver" | "bronze" | null;
  task_scores!: RegionResultsYearContestantTask[];
}

class RegionResultsYear {
  year!: number;
  contestants!: RegionResultsYearContestant[];
}

class RegionResults {
  navigation!: RegionNavigation;
  results!: RegionResultsYear[];
}

async function loadRegionsList(): Promise<RegionItem[]> {
  return axios.get(`${ROOT_URL}/regions`).then(res => {
    return res.data.regions;
  });
}

async function loadRegionDetail(id: string): Promise<RegionDetail> {
  return axios.get(`${ROOT_URL}/regions/${id}`).then(res => {
    return res.data;
  });
}

async function loadRegionResults(id: string): Promise<RegionResults> {
  return axios.get(`${ROOT_URL}/regions/${id}/results`).then(res => {
    return res.data;
  });
}

export {
  RegionItem,
  RegionDetail,
  RegionResults,
  RegionResultsYear,
  loadRegionsList,
  loadRegionDetail,
  loadRegionResults
};
