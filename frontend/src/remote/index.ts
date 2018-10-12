export class Contestant {
  id!: string;
  first_name!: string | null;
  last_name!: string;
}

export let ROOT_URL =
  process.env.REACT_APP_API_BASE_URI || "https://stats.olinfo.it/api";
