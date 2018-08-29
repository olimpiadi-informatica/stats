import { FETCH_CONTESTS, FETCH_CONTEST } from 'constants/ActionTypes'
import _ from 'lodash'

const initialState = {}

export default function (state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case FETCH_CONTESTS:
      return   _.mapKeys(action.payload.data.contests, 'year')
      case FETCH_CONTEST:
      return { ...state, [action.payload.data.year] : {'details' : action.payload.data} }
    default:
      return state
  }
}
