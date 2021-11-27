import useSWR from "swr";
import { ROOT_URL, Contestant, NumMedals, fetcher, Loadable } from "./common";
import { ContestLocation } from "./contest";

type RegionWithMostMedalsInfo = {
  id: string;
  name: string;
  num_medals: NumMedals;
};

export type RegionWithMostMedals = {
  region_with_most_medals: {
    first: RegionWithMostMedalsInfo;
    second: RegionWithMostMedalsInfo;
  };
};

export type RegionWithMostMedalsPerParticipant = {
  region_with_most_medals_per_participant: {
    id: string;
    name: string;
    medals_per_participant: number;
  };
};

export type RegionWithMostFirstPlaces = {
  region_with_most_first_places: {
    id: string;
    name: string;
    num_first_places: number;
  };
};

export type RegionWithMostParticipants = {
  region_with_most_participants: {
    id: string;
    name: string;
    num_participants: number;
  };
};

export type StatsRegion =
  | RegionWithMostMedals
  | RegionWithMostMedalsPerParticipant
  | RegionWithMostFirstPlaces
  | RegionWithMostParticipants;

export type BestStudent = {
  best_student: {
    contestant: Contestant;
    num_medals: NumMedals;
  };
};

export type WinAtFirstParticipation = {
  win_at_first_participation: {
    contestant: Contestant;
    year: number;
  };
};

export type StudentWithMostParticipations = {
  student_with_most_participations: {
    contestant: Contestant;
    num_participations: number;
  };
};

export type IOIstWithWorstRank = {
  ioist_with_worst_rank: {
    contestant: Contestant;
    contest_year: number;
    rank: number;
  };
};

export type StatsUser =
  | BestStudent
  | WinAtFirstParticipation
  | StudentWithMostParticipations
  | IOIstWithWorstRank;

export type TaskWithLowestAvgScore = {
  task_with_lowest_avg_score: {
    contest_year: number;
    name: string;
    title: string;
    avg_score: number;
    max_score_possible: number;
  };
};

export type TaskWithHighestAvgScore = {
  task_with_highest_avg_score: {
    contest_year: number;
    name: string;
    title: string;
    avg_score: number;
    max_score_possible: number;
  };
};

export type TaskWithLowestMaxScore = {
  task_with_lowest_max_score: {
    contest_year: number;
    name: string;
    title: string;
    max_score: number;
    max_score_possible: number;
  };
};

export type TaskWithMostZeros = {
  task_with_most_zeros: {
    contest_year: number;
    name: string;
    title: string;
    num_zeros: number;
  };
};

export type TaskWithMostFullscores = {
  task_with_most_fullscores: {
    contest_year: number;
    name: string;
    title: string;
    num_fullscores: number;
  };
};

export type StatsTask =
  | TaskWithLowestAvgScore
  | TaskWithHighestAvgScore
  | TaskWithLowestMaxScore
  | TaskWithMostZeros
  | TaskWithMostFullscores;

export type ContestWithMostParticipants = {
  contest_with_most_participants: {
    year: number;
    num_participants: number;
  };
};

export type ContestWithMostExAequo = {
  contest_with_most_ex_aequo: {
    year: number;
    num_ex_aequo: number;
  };
};

export type MostNorthenContest = {
  most_northern_contest: {
    year: number;
    location: ContestLocation;
  };
};

export type MostSouthernContest = {
  most_southern_contest: {
    year: number;
    location: ContestLocation;
  };
};

export type NumBoysGirls = {
  num_boys_girls: {
    years: {
      year: number;
      num_boys: number;
      num_girls: number;
    }[];
  };
};

export type NumParticipantsPerYear = {
  num_participants_per_year: {
    years: {
      year: number;
      num_participants: number;
    }[];
  };
};

export type MostUsedLocation = {
  most_used_location: {
    location: ContestLocation;
    years: number[];
  };
};

export type StatsContest =
  | ContestWithMostParticipants
  | ContestWithMostExAequo
  | MostNorthenContest
  | MostSouthernContest
  | NumBoysGirls
  | NumParticipantsPerYear
  | MostUsedLocation;

export type Stats = {
  region: StatsRegion[];
  user: StatsUser[];
  task: StatsTask[];
  contest: StatsContest[];
};

export function useStats(): Loadable<Stats> {
  const { data, error } = useSWR(`${ROOT_URL}/home`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
