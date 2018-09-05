import { FETCH_CONTESTANTS, FETCH_CONTESTANT } from '../constants/ActionTypes'
import _ from 'lodash'

const initialState = {}

export default function (state = initialState, action) {

  switch (action.type) {
    case FETCH_CONTESTANTS:
    return   _.mapKeys(action.payload.data.users, 'contestant.id')
    case FETCH_CONTESTANT:
    return { ...state, [action.payload.data.contestant.id] : action.payload.data }
    default:
    return state
  }
}
