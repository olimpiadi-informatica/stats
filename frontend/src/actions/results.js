import axios from 'axios'
import { FETCH_CONTEST_RESULTS } from 'constants/ActionTypes'

const ROOT_URL = 'https://stats.olinfo.it/api'

export function fetchResults(year) {
  const request = axios.get(`${ROOT_URL}/contests/${year}/results`)
  return {
    type: FETCH_CONTEST_RESULTS,
    payload: request
  }
}
