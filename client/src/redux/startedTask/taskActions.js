import { SET_TASK } from './taskTypes'


export const setTime = task => {
  return {
    type: SET_TASK,
    payload: task
  }
}