import axios from 'axios'
import { FETCH_TASKS, FETCH_TASK } from 'constants/ActionTypes'

const ROOT_URL = 'https://stats.olinfo.it/api'

export function fetchTasks(year) {
  const request = axios.get(`${ROOT_URL}/tasks`)
  return {
    type: FETCH_TASKS,
    payload: request
  }
}

export function fetchTask(year,task) {
  const request = axios.get(`${ROOT_URL}/tasks/${year}/${task}`)
  console.log(request);
  return {
    type: FETCH_TASK,
    payload: request
  }
}
