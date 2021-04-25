import {SET_EMAIL,SET_USERNAME} from './userTypes'

export const setUsername = username =>{
    return {
        type: SET_USERNAME,
        payload: username
    }
}


export const setEmail = email =>{
    return {
        type: SET_EMAIL,
        payload: email
    }
}