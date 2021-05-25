import { SET_TASK } from './taskTypes'


export const setTask = task => {
  return {
    type: SET_TASK,
    payload: task
  }
}