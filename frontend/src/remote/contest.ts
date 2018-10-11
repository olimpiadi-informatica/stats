import axios from "axios";

import { ROOT_URL } from "./index";

class ContestLocation {
  location!: string | null;
  gmaps!: string | null;
  latitude!: number | null;
  longitude!: number | null;
}

class ContestInfoTask {
  name!: string;
  title!: string;
  link!: string | null;
  index!: number;
  max_score_possible!: number | null;
}

class ContestMedalInfo {
  number!: number | null;
  cutoff!: number | null;
}

class ContestItem {
  year!: number;
  location!: ContestLocation;
  region!: string | null;
  num_contestants!: number | null;
  max_score_possible!: number | null;
  max_score!: number | null;
  avg_score!: number | null;
  tasks!: ContestInfoTask[];
  medals!: {
    gold: ContestMedalInfo;
    silver: ContestMedalInfo;
    bronze: ContestMedalInfo;
  };
}

async function loadContestList(): Promise<ContestItem[]> {
  return axios.get(`${ROOT_URL}/contests`).then(res => {
    return res.data.contests;
  });
}

export { ContestItem, loadContestList };
