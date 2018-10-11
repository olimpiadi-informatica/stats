import axios from "axios";

import { ROOT_URL, Contestant } from "./index";

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

async function loadContestant(id: string): Promise<ContestantDetail> {
  return axios.get(`${ROOT_URL}/users/${id}`).then(res => {
    return res.data;
  });
}

export { ContestantDetail, loadContestant };
