import { SET_TASK } from './taskTypes'


const initialState = {
  taskName: '',
  taskSubject: '',
  taskDesc: ''
}

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK: return {
      state: action.payload
    }
    default: return state
  }
}

export default timeReducer