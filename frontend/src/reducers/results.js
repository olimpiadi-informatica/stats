import _ from 'lodash'
import { FETCH_CONTEST_RESULTS } from '../constants/ActionTypes'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTEST_RESULTS:
    return { ...state, [action.payload.data.navigation.current] : action.payload.data }
    default:
    return state
  }
}
