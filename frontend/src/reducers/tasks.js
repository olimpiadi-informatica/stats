import { FETCH_TASKS, FETCH_TASK } from '../constants/ActionTypes'
import _ from 'lodash'

const initialState = {}

export default function (state = initialState, action) {

  switch (action.type) {
    case FETCH_TASKS:
    let newState = {}
    _.map(action.payload.data.tasks, (task_per_year) => {
      _.map(task_per_year.tasks, (task) => {
        newState[task_per_year.year + '-' + task.name] = task
      })
    })
    return   newState
    case FETCH_TASK:
    const {current} = action.payload.data.navigation
    return { ...state, [current.year + '-' + current.name] : action.payload.data }
    default:
    return state
  }
}
