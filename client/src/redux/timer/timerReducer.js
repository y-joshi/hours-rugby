import { SET_IS_ACTIVE, SET_IS_PAUSED, SET_IS_STOPPED, SET_TIME, RESET_TIME } from './timerTypes'


const initialState = {
  isActive: false,
  isPaused: false,
  isStopped: true,
  time: 0
}

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_ACTIVE: return {
      ...state,
      isActive: action.payload,
    }
    case SET_IS_PAUSED: return {
      ...state,
      isPaused: action.payload,
    }
    case SET_IS_STOPPED: return {
      ...state,
      isStopped: action.payload,
    }
    case SET_TIME: return {
      ...state,
      time: state.time + action.payload,
    }
    case RESET_TIME: return {
      ...state,
      time: action.payload
    }
    default: return state
  }
}

export default timeReducer