import {
  ROOT_URL,
  Contestant,
  NumMedals,
  Loadable,
  fetcher,
  Error,
  Medal,
} from "./common";
import useSWR from "swr";

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

export function useContestantList(): Loadable<ContestantList> {
  const { data, error } = useSWR(`${ROOT_URL}/users`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function loadContestant(
  id: string
): Promise<ContestantDetail | Error> {
  const res = await fetch(`${ROOT_URL}/users/${id}`);
  return await res.json();
}
