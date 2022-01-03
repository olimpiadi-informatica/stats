import { Contestant, Medal, loadJSON, International } from "./common";

export type ContestLocation = {
  location: string | null;
  gmaps: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type ContestInfoTask = {
  contest_year: number;
  name: string;
  title: string;
  link: string | null;
  index: number;
  max_score: number | null;
  max_score_possible: number | null;
};

type MedalInfo = {
  number: number | null;
  cutoff: number | null;
};

export type ContestMedalInfo = {
  gold: MedalInfo;
  silver: MedalInfo;
  bronze: MedalInfo;
};

export type ContestDetailTask = {
  contest_year: number;
  name: string;
  title: string;
  link: string | null;
  index: number;
  max_score_possible: number | null;
  max_score: number | null;
  avg_score: number | null;
};

export type ContestBase = {
  location: ContestLocation;
  region: string | null;
  num_contestants: number | null;
  max_score_possible: number | null;
  max_score: number | null;
  avg_score: number | null;
  medals: ContestMedalInfo;
};

export type ContestItem = ContestBase & {
  year: number;
  tasks: ContestInfoTask[];
};

export type ContestList = {
  contests: ContestItem[];
};

export type ContestDetail = ContestBase & {
  navigation: {
    current: number;
    previous: number | null;
    next: number | null;
  };
  tasks: ContestDetailTask[];
};

type PastParticipation = {
  year: number;
  medal: Medal;
};

type ContestResultItem = {
  rank: number | null;
  contestant: Contestant;
  region: string | null;
  score: number | null;
  internationals: International[];
  scores: (number | null)[];
  medal: Medal;
  past_participations: PastParticipation[];
};

export type ContestResults = {
  navigation: {
    current: number;
    previous: number | null;
    next: number | null;
  };
  tasks: string[];
  results: ContestResultItem[];
};

export async function getContestList(): Promise<ContestList> {
  return await loadJSON("contests.json");
}

export async function getContest(year: number): Promise<ContestDetail> {
  return await loadJSON(`contests/${year}.json`);
}

export async function getContestResults(year: number): Promise<ContestResults> {
  return await loadJSON(`contests/${year}/results.json`);
}
