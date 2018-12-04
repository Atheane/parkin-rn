
import * as types from '../constants/ActionTypes'


export const setPosition = (location) => {
  return {
    type: types.SET_POSITION,
    payload: location
  }
}
