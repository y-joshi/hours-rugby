import { SET_USERNAME, SET_EMAIL, SET_USERID, SET_NAME, SET_USER } from './userTypes'

const initialState = {
  user: {
    username: null,
    id: null,
    name: null,
    email: null,
    password: null,
    subjects: []
  }
}


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME: return {
      ...state,
      user: { ...state.user, username: action.payload }
    }
    case SET_USERID: return {
      ...state,
      user: { ...state.user, user_id: action.payload }
    }
    case SET_NAME: return {
      ...state,
      user: { ...state.user, name: action.payload }
    }
    case SET_EMAIL: return {
      ...state,
      user: { ...state.user, email: action.payload }
    }
    case SET_USER: return {
      ...state,
      user: action.payload
    }
    default: return state
  }
}

export default userReducer