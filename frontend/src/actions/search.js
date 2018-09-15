import axios from "axios";
import { FETCH_SEARCH_RESULTS } from "../constants/ActionTypes";

const ROOT_URL = "https://stats.olinfo.it/api";

export function fetchSearchResults(q) {
  const request = axios.get(`${ROOT_URL}/search?q=${q}`);
  return {
    type: FETCH_SEARCH_RESULTS,
    payload: request
  };
}
