import axios from "axios";
import { FETCH_CONTESTANTS, FETCH_CONTESTANT } from "../constants/ActionTypes";
import { ROOT_URL } from "./remote.js";

export function fetchContestats(year) {
  const request = axios.get(`${ROOT_URL}/users`);
  return {
    type: FETCH_CONTESTANTS,
    payload: request
  };
}

export function fetchContestat(id) {
  const request = axios.get(`${ROOT_URL}/users/${id}`);
  return {
    type: FETCH_CONTESTANT,
    payload: request
  };
}
