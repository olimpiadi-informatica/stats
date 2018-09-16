import axios from "axios";
import { FETCH_REGIONS_MC } from "../constants/ActionTypes";
import { ROOT_URL } from "./remote.js";

export function fetchRegionsMC() {
  const request = axios.get(`${ROOT_URL}/regions`);
  return {
    type: FETCH_REGIONS_MC,
    payload: request
  };
}
