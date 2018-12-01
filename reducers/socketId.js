import * as types from '../constants/ActionTypes'

export default (currentState, action) => {
  if (currentState === undefined) {
    return ''
  } else {
    if (action.type === types.SET_CONNECTION) {
      return action.payload
    } else {
      return currentState
    }
  }
}