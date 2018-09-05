import { FETCH_SEARCH_RESULTS } from '../constants/ActionTypes'
import _ from 'lodash'

const initialState = {}

export default function (state = initialState, action) {

  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
    return   action.payload.data.results
    default:
    return state
  }
}
