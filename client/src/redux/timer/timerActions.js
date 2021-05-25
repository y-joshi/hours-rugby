import { SET_IS_ACTIVE, SET_IS_PAUSED, SET_IS_STOPPED, SET_TIME, RESET_TIME } from './timerTypes'

export const setIsActive = (isActive) => {
  return {
    type: SET_IS_ACTIVE,
    payload: isActive
  }
}

export const setIsPaused = (isPaused) => {
  return {
    type: SET_IS_PAUSED,
    payload: isPaused
  }
}

export const setIsStopped = (isStopped) => {
  return {
    type: SET_IS_STOPPED,
    payload: isStopped
  }
}

export const setTime = time => {
  return {
    type: SET_TIME,
    payload: time
  }
}

export const resetTime = () => {
  return {
    type: RESET_TIME,
    payload: 0
  }
}