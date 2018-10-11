import axios from "axios";

import { ROOT_URL, Contestant } from "./index";

class ContestLocation {
  location!: string | null;
  gmaps!: string | null;
  latitude!: number | null;
  longitude!: number | null;
}

class ContestInfoTask {
  name!: string;
  title!: string;
  link!: string | null;
  index!: number;
  max_score_possible!: number | null;
}

class MedalInfo {
  number!: number | null;
  cutoff!: number | null;
}

class ContestMedalInfo {
  gold!: MedalInfo;
  silver!: MedalInfo;
  bronze!: MedalInfo;
}

class ContestDetailTask {
  name!: string;
  title!: string;
  link!: string | null;
  index!: number;
  max_score_possible!: number | null;
  max_score!: number | null;
  avg_score!: number | null;
}

class ContestBase {
  location!: ContestLocation;
  region!: string | null;
  num_contestants!: number | null;
  max_score_possible!: number | null;
  max_score!: number | null;
  avg_score!: number | null;
  medals!: ContestMedalInfo;
}

class ContestItem extends ContestBase {
  year!: number;
  tasks!: ContestInfoTask[];
}

class ContestDetail extends ContestBase {
  navigation!: {
    current: number;
    previous: number | null;
    next: number | null;
  };
  tasks!: ContestDetailTask[];
}

class PastParticipation {
  year!: number;
  medal!: MedalInfo;
}

class ContestResultItem {
  rank!: number | null;
  contestant!: Contestant;
  region!: string | null;
  score!: number | null;
  ioi!: boolean;
  scores!: (number | null)[];
  medal!: string;
  past_participations!: PastParticipation[];
}

class ContestResults {
  navigation!: {
    current: number;
    previous: number | null;
    next: number | null;
  };
  tasks!: string[];
  results!: ContestResultItem[];
}

async function loadContestList(): Promise<ContestItem[]> {
  return axios.get(`${ROOT_URL}/contests`).then(res => {
    return res.data.contests;
  });
}

async function loadContestDetail(year: number): Promise<ContestDetail> {
  return axios.get(`${ROOT_URL}/contests/${year}`).then(res => {
    return res.data;
  });
}

async function loadContestResults(year: number): Promise<ContestResults> {
  return axios.get(`${ROOT_URL}/contests/${year}/results`).then(res => {
    return res.data;
  });
}

export {
  ContestItem,
  ContestDetail,
  ContestDetailTask,
  ContestMedalInfo,
  ContestResults,
  loadContestList,
  loadContestDetail,
  loadContestResults
};
