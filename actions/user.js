
import * as types from '../constants/ActionTypes'


export const logUser = (firstConnection) => {
  return {
    type: types.LOG_USER,
    payload: firstConnection
  }
}

export const setUserData = (facebookJson) => {
  return {
    type: types.SET_USERDATA,
    payload: facebookJson
  }
}