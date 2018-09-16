import axios from "axios";
import {
  FETCH_CONTESTS,
  FETCH_CONTEST,
  FETCH_CONTEST_RESULTS
} from "../constants/ActionTypes";
import { ROOT_URL } from "./remote.js";

export function fetchContests() {
  const request = axios.get(`${ROOT_URL}/contests`);
  return {
    type: FETCH_CONTESTS,
    payload: request
  };
}

export function fetchContest(year) {
  const request = axios.get(`${ROOT_URL}/contests/${year}`);
  return {
    type: FETCH_CONTEST,
    payload: request
  };
}

export function fetchResults(year) {
  const request = axios.get(`${ROOT_URL}/contests/${year}/results`);
  return {
    type: FETCH_CONTEST_RESULTS,
    payload: request
  };
}
