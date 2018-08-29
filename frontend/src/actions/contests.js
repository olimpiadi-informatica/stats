import axios from 'axios'
import { FETCH_CONTESTS } from 'constants/ActionTypes'
import { FETCH_CONTEST } from 'constants/ActionTypes'

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
  console.log(request);
  return {
    type: FETCH_CONTEST,
    payload: request
  }
}
