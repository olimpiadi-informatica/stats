import axios from 'axios'
import { FETCH_REGIONS, FETCH_REGION, FETCH_REGION_RESULTS } from '../constants/ActionTypes'

const ROOT_URL = 'https://stats.olinfo.it/api'

export function fetchRegions() {
  const request = axios.get(`${ROOT_URL}/regions`)
  return {
    type: FETCH_REGIONS,
    payload: request
  }
}

export function fetchRegionResults(region) {
  const request = axios.get(`${ROOT_URL}/regions/${region}/results`)
  return {
    type: FETCH_REGION_RESULTS,
    payload: request
  }
}

export function fetchRegion(region) {
  const request = axios.get(`${ROOT_URL}/regions/${region}`)
  return {
    type: FETCH_REGION,
    payload: request
  }
}
