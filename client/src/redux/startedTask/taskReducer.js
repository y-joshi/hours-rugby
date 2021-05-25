import { SET_TASK } from './taskTypes'


const initialState = {
  task: {
    name: null,
    subject: null,
    description: null,
    startedAt: null,
    endedAt: null
  }
}

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK: return {
      ...state,
      task: action.payload
    }
    default: return state
  }
}

export default timeReducer