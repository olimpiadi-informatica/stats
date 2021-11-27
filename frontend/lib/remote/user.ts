import { ROOT_URL, Contestant, NumMedals } from "./common";

type ContestantParticipationScore = {
  task: string;
  score: number | null;
  max_score_possible: number | null;
};

type ContestantParticipation = {
  year: number;
  ioi: boolean;
  medal: string | null;
  rank: number | null;
  scores: ContestantParticipationScore[];
};

export type ContestantDetail = {
  contestant: Contestant;
  participations: ContestantParticipation[];
};

type ContestantItemParticipation = {
  year: number;
  ioi: boolean;
  medal: string | null;
};

export type ContestantItem = {
  contestant: Contestant;
  num_medals: NumMedals;
  best_rank: number | null;
  participations: ContestantItemParticipation[];
};

// async function loadContestant(id: string): Promise<ContestantDetail> {
//   return axios.get(`${ROOT_URL}/users/${id}`).then(res => {
//     return res.data;
//   });
// }

// async function loadContestantsList(): Promise<ContestantItem[]> {
//   return axios.get(`${ROOT_URL}/users`).then(res => {
//     return res.data.users;
//   });
// }

// export { ContestantDetail, ContestantItem, loadContestant, loadContestantsList };
