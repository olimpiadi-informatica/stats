import axios from "axios";
import { FETCH_TASKS, FETCH_TASK } from "../constants/ActionTypes";

const ROOT_URL = "http://localhost:8000";

export function fetchTasks(year) {
  const request = axios.get(`${ROOT_URL}/tasks`);
  return {
    type: FETCH_TASKS,
    payload: request
  };
}

export function fetchTask(year, task) {
  const request = axios.get(`${ROOT_URL}/tasks/${year}/${task}`);
  return {
    type: FETCH_TASK,
    payload: request
  };
}
