import axios from "axios";
import { FETCH_REGIONS_MC } from "../constants/ActionTypes";

const ROOT_URL = "https://stats.olinfo.it/api";

export function fetchRegionsMC() {
  const request = axios.get(`${ROOT_URL}/regions`);
  return {
    type: FETCH_REGIONS_MC,
    payload: request
  };
}
