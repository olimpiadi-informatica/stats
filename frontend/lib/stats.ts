import { readFile } from "node:fs/promises";

export type RegionStat =
  | {
      type: "region_with_most_medals";
      region: string;
      region2: string;
    }
  | {
      type: "region_with_most_medals_per_participant";
      region: string;
      medals_per_participant: number;
    }
  | {
      type: "region_with_most_first_places";
      region: string;
      num_first_places: number;
    }
  | {
      type: "region_with_most_participants";
      region: string;
      num_participants: number;
    };

export type UserStat =
  | {
      type: "user_best";
      user: string;
    }
  | {
      type: "user_win_at_first_participation";
      user: string;
      year: number;
    }
  | {
      type: "user_with_most_participations";
      user: string;
      num_participations: number;
    }
  | {
      type: "user_ioist_with_worst_rank";
      user: string;
      year: number;
      rank: number;
    };

export type TaskStat =
  | {
      type: "task_with_lowest_avg_score";
      contest_year: number;
      name: string;
      avg_score: number;
    }
  | {
      type: "task_with_highest_avg_score";
      contest_year: number;
      name: string;
      avg_score: number;
    }
  | {
      type: "task_with_lowest_max_score";
      contest_year: number;
      name: string;
    }
  | {
      type: "task_with_most_zeros";
      contest_year: number;
      name: string;
      num_zeros: number;
      num_participants: number;
    }
  | {
      type: "task_with_most_fullscores";
      contest_year: number;
      name: string;
      num_fullscores: number;
      num_participants: number;
    };

export type ContestStat =
  | {
      type: "contest_with_most_participants";
      year: number;
    }
  | {
      type: "contest_with_most_ex_aequo";
      year: number;
      num_ex_aequo: number;
    }
  | {
      type: "contest_most_northern";
      year: number;
    }
  | {
      type: "contest_most_southern";
      year: number;
      location: string;
    }
  | {
      type: "contest_with_most_girls";
      year: number;
      num_girls: number;
    }
  | {
      type: "contest_num_boys_girls";
      years: {
        year: number;
        num_boys: number;
        num_girls: number;
      }[];
    }
  | {
      type: "contest_num_participants_per_year";
      years: {
        year: number;
        num_participants: number;
      }[];
    }
  | {
      type: "contest_most_used_location";
      location: string;
      years: number[];
    };

export type HomepageStat = {
  region: RegionStat[];
  user: UserStat[];
  task: TaskStat[];
  contest: ContestStat[];
};

export async function getStats(): Promise<HomepageStat> {
  return JSON.parse(await readFile("../data/home.json", "utf8"));
}
