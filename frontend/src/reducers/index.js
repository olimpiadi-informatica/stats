import { combineReducers } from 'redux'
import counter from './counter'
import contests from './contests'

const rootReducer = combineReducers({
  counter,
  contests
})

export default rootReducer
