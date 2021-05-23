import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import timeReducer from './timer/timerReducer'
import taskReducer from './startedTask/taskReducer'

const rootReducer = combineReducers({
  user: userReducer,
  timer: timeReducer,
  startedTask: taskReducer
})

export default rootReducer