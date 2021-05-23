import { SET_EMAIL, SET_USERNAME, SET_NAME, SET_USER, SET_USERID } from './userTypes'

export const setUsername = username => {
  return {
    type: SET_USERNAME,
    payload: username
  }
}

export const setUserId = user_id => {
  return {
    type: SET_USERID,
    payload: user_id
  }
}

export const setEmail = email => {
  return {
    type: SET_EMAIL,
    payload: email
  }
}

export const setName = name => {
  return {
    type: SET_NAME,
    payload: name
  }
}

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  }
}