import axios from "axios";
import { FETCH_CONTEST_RESULTS } from "../constants/ActionTypes";

const ROOT_URL = "http://localhost:8000";

export function fetchResults(year) {
  const request = axios.get(`${ROOT_URL}/contests/${year}/results`);
  return {
    type: FETCH_CONTEST_RESULTS,
    payload: request
  };
}
