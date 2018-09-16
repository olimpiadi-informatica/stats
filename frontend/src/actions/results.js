import axios from "axios";
import { FETCH_CONTEST_RESULTS } from "../constants/ActionTypes";
import { ROOT_URL } from "./remote.js";

export function fetchResults(year) {
  const request = axios.get(`${ROOT_URL}/contests/${year}/results`);
  return {
    type: FETCH_CONTEST_RESULTS,
    payload: request
  };
}
