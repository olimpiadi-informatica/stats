import _ from 'lodash'
import { FETCH_CONTEST_RESULTS } from '../constants/ActionTypes'

const initialState = {}

export default function (state = initialState, action) {
  if (action.error) action.type = 'ERROR'
  switch (action.type) {
    case FETCH_CONTEST_RESULTS:
    return { ...state, [action.payload.data.navigation.current] : action.payload.data }
    case 'ERROR':
    return { error : 'Connection Error' }
    default:
    return state
  }
}
