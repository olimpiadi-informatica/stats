import { combineReducers } from 'redux'
import counter from './counter'
import contests from './contests'
// import results from './results'
import contestants from './contestants'
import tasks from './tasks'
import regions from './regions'

const rootReducer = combineReducers({
  counter,
  contests,
  // results,
  contestants,
  tasks,
  regions
})

export default rootReducer
