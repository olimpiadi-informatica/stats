import axios from "axios";

import { ROOT_URL, Contestant, NumMedals } from "./index";

class ContestantParticipationScore {
  task!: string;
  score!: number | null;
  max_score_possible!: number | null;
}

class ContestantParticipation {
  year!: number;
  ioi!: boolean;
  medal!: string | null;
  rank!: number | null;
  scores!: ContestantParticipationScore[];
}

class ContestantDetail {
  contestant!: Contestant;
  participations!: ContestantParticipation[];
}

class ContestantItemParticipation {
  year!: number;
  ioi!: boolean;
  medal!: string | null;
}

class ContestantItem {
  contestant!: Contestant;
  num_medals!: NumMedals;
  best_rank!: number | null;
  participations!: ContestantItemParticipation[];
}

async function loadContestant(id: string): Promise<ContestantDetail> {
  return axios.get(`${ROOT_URL}/users/${id}`).then(res => {
    return res.data;
  });
}

async function loadContestantsList(): Promise<ContestantItem[]> {
  return axios.get(`${ROOT_URL}/users`).then(res => {
    return res.data.users;
  });
}

export { ContestantDetail, ContestantItem, loadContestant, loadContestantsList };
