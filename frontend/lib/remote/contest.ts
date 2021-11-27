import { ROOT_URL, Contestant } from "./common";

export type ContestLocation = {
  location: string | null;
  gmaps: string | null;
  latitude: number | null;
  longitude: number | null;
};

type ContestInfoTask = {
  name: string;
  title: string;
  link: string | null;
  index: number;
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
  name: string;
  title: string;
  link: string | null;
  index: number;
  max_score_possible: number | null;
  max_score: number | null;
  avg_score: number | null;
};

type ContestBase = {
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
  medal: MedalInfo;
};

type ContestResultItem = {
  rank: number | null;
  contestant: Contestant;
  region: string | null;
  score: number | null;
  ioi: boolean;
  scores: (number | null)[];
  medal: string;
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

// async function loadContestList(): Promise<ContestItem[]> = {
//   return axios.get(`${ROOT_URL}/contests`).then(res => {
//     return res.data.contests;
//   });
// }

// async function loadContestDetail(year: number): Promise<ContestDetail> {
//   return axios.get(`${ROOT_URL}/contests/${year}`).then(res => {
//     return res.data;
//   });
// }

// async function loadContestResults(year: number): Promise<ContestResults> {
//   return axios.get(`${ROOT_URL}/contests/${year}/results`).then(res => {
//     return res.data;
//   });
// }

// export {
//   ContestItem,
//   ContestDetail,
//   ContestDetailTask,
//   ContestMedalInfo,
//   ContestResults,
//   ContestLocation,
//   loadContestList,
//   loadContestDetail,
//   loadContestResults,
// };
