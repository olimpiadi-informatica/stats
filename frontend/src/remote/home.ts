import axios from "axios";

import { ROOT_URL, Contestant, NumMedals } from "./index";
import { ContestLocation } from "./contest";

class RegionWithMostMedalsInfo {
  id!: string;
  name!: string;
  num_medals!: NumMedals;
}

export class RegionWithMostMedals {
  region_with_most_medals!: {
    first: RegionWithMostMedalsInfo;
    second: RegionWithMostMedalsInfo;
  };
}

export class RegionWithMostMedalsPerParticipant {
  region_with_most_medals_per_participant!: {
    id: string;
    name: string;
    medals_per_participant: number;
  };
}

export class RegionWithMostFirstPlaces {
  region_with_most_first_places!: {
    id: string;
    name: string;
    num_first_places: number;
  };
}

export class RegionWithMostParticipants {
  region_with_most_participants!: {
    id: string;
    name: string;
    num_participants: number;
  };
}

export type StatsRegion =
  | RegionWithMostMedals
  | RegionWithMostMedalsPerParticipant
  | RegionWithMostFirstPlaces
  | RegionWithMostParticipants;

export class BestStudent {
  best_student!: {
    contestant: Contestant;
    num_medals: NumMedals;
  };
}

export class WinAtFirstParticipation {
  win_at_first_participation!: {
    contestant: Contestant;
    year: number;
  };
}

export class StudentWithMostParticipations {
  student_with_most_participations!: {
    contestant: Contestant;
    num_participations: number;
  };
}

export class IOIstWithWorstRank {
  ioist_with_worst_rank!: {
    contestant: Contestant;
    contest_year: number;
    rank: number;
  };
}

export type StatsUser = BestStudent | WinAtFirstParticipation | StudentWithMostParticipations | IOIstWithWorstRank;

export class TaskWithLowestAvgScore {
  task_with_lowest_avg_score!: {
    contest_year: number;
    name: string;
    title: string;
    avg_score: number;
    max_score_possible: number;
  };
}

export class TaskWithHighestAvgScore {
  task_with_highest_avg_score!: {
    contest_year: number;
    name: string;
    title: string;
    avg_score: number;
    max_score_possible: number;
  };
}

export class TaskWithLowestMaxScore {
  task_with_lowest_max_score!: {
    contest_year: number;
    name: string;
    title: string;
    max_score: number;
    max_score_possible: number;
  };
}

export class TaskWithMostZeros {
  task_with_most_zeros!: {
    contest_year: number;
    name: string;
    title: string;
    num_zeros: number;
  };
}

export class TaskWithMostFullscores {
  task_with_most_fullscores!: {
    contest_year: number;
    name: string;
    title: string;
    num_fullscores: number;
  };
}

export type StatsTask =
  | TaskWithLowestAvgScore
  | TaskWithHighestAvgScore
  | TaskWithLowestMaxScore
  | TaskWithMostZeros
  | TaskWithMostFullscores;

export class ContestWithMostParticipants {
  contest_with_most_participants!: {
    year: number;
    num_participants: number;
  };
}

export class ContestWithMostExAequo {
  contest_with_most_ex_aequo!: {
    year: number;
    num_ex_aequo: number;
  };
}

export class MostNorthenContest {
  most_northern_contest!: {
    year: number;
    location: ContestLocation;
  };
}

export class MostSouthernContest {
  most_southern_contest!: {
    year: number;
    location: ContestLocation;
  };
}

export class NumBoysGirls {
  num_boys_girls!: {
    years: {
      year: number;
      num_boys: number;
      num_girls: number;
    }[];
  };
}

export class NumParticipantsPerYear {
  num_participants_per_year!: {
    years: {
      year: number;
      num_participants: number;
    }[];
  };
}

export class MostUsedLocation {
  most_used_location!: {
    location: ContestLocation;
    years: number[];
  };
}

export type StatsContest =
  | ContestWithMostParticipants
  | ContestWithMostExAequo
  | MostNorthenContest
  | MostSouthernContest
  | NumBoysGirls
  | NumParticipantsPerYear
  | MostUsedLocation;

export class Stats {
  region!: StatsRegion[];
  user!: StatsUser[];
  task!: StatsTask[];
  contest!: StatsContest[];
}

export async function loadHome(): Promise<Stats> {
  return axios.get(`${ROOT_URL}/home`).then(res => {
    return res.data;
  });
}
