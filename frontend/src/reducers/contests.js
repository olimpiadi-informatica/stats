import { FETCH_CONTESTS, FETCH_CONTEST, FETCH_CONTEST_RESULTS } from 'constants/ActionTypes'
import _ from 'lodash'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTESTS:
    return   _.mapKeys(action.payload.data.contests, 'year')
    case FETCH_CONTEST:
    return { ...state, [action.payload.data.navigation.current] : action.payload.data }
    case FETCH_CONTEST_RESULTS:
    state[action.payload.data.navigation.current]['results'] = action.payload.data
    return { ...state }
    default:
    return state
  }
}
