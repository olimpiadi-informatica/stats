import { FETCH_SEARCH_RESULTS } from '../constants/ActionTypes'
import _ from 'lodash'

const initialState = {}

export default function (state = initialState, action) {
if (action.error) action.type = 'ERROR'
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
    return   action.payload.data.results
    case 'ERROR':
    return { error : 'Connection Error' }
    default:
    return state
  }
}
