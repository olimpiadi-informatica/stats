import { Contestant, NumMedals, Medal, loadJSON } from "./common";

export type ContestantParticipationScore = {
  task: string;
  score: number | null;
  max_score_possible: number | null;
};

type ContestantParticipation = {
  year: number;
  ioi: boolean;
  medal: Medal;
  rank: number | null;
  region: string | null;
  scores: ContestantParticipationScore[];
};

export type ContestantDetail = {
  contestant: Contestant;
  participations: ContestantParticipation[];
};

type ContestantItemParticipation = {
  year: number;
  ioi: boolean;
  medal: Medal;
};

export type ContestantItem = {
  contestant: Contestant;
  num_medals: NumMedals;
  best_rank: number | null;
  participations: ContestantItemParticipation[];
};

export type ContestantList = {
  users: ContestantItem[];
};

export async function getContestantList(): Promise<ContestantList> {
  return await loadJSON("users.json");
}

export async function getContestant(id: string): Promise<ContestantDetail> {
  return await loadJSON(`users/${id}.json`);
}
