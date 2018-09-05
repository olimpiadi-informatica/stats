import axios from 'axios'
import { FETCH_CONTESTS, FETCH_CONTEST, FETCH_CONTEST_RESULTS } from '../constants/ActionTypes'

const ROOT_URL = 'https://stats.olinfo.it/api'

export function fetchContests() {
  const request = axios.get(`${ROOT_URL}/contests`)
  return {
    type: FETCH_CONTESTS,
    payload: request
  }
}

export function fetchContest(year) {
  const request = axios.get(`${ROOT_URL}/contests/${year}`)
  return {
    type: FETCH_CONTEST,
    payload: request
  }
}

export function fetchResults(year) {
  const request = axios.get(`${ROOT_URL}/contests/${year}/results`)
  return {
    type: FETCH_CONTEST_RESULTS,
    payload: request
  }
}
