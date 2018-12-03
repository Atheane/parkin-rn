
import * as types from '../constants/ActionTypes'


export const logUser = (emptyAsyncStorage) => {
  return {
    type: types.LOG_USER,
    payload: emptyAsyncStorage
  }
}

export const setUserData = (facebookJson) => {
  return {
    type: types.SET_USERDATA,
    payload: facebookJson
  }
}