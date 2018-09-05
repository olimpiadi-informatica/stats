import { FETCH_CONTESTS, FETCH_CONTEST, FETCH_CONTEST_RESULTS } from '../constants/ActionTypes'
import _ from 'lodash'

const initialState = {}

export default function (state = initialState, action) {
  if (action.error) action.type = 'ERROR'
  switch (action.type) {
    case FETCH_CONTESTS:
    return   _.mapKeys(action.payload.data.contests, 'year')
    case FETCH_CONTEST:
    return { ...state, [action.payload.data.navigation.current] : action.payload.data }
    case FETCH_CONTEST_RESULTS:
    const newContests = JSON.parse(JSON.stringify(state))
    newContests[action.payload.data.navigation.current]['results'] = action.payload.data
    return newContests
    case 'ERROR':
    return { error : 'Connection Error' }
    default:
    return state
  }
}
