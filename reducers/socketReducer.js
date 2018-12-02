import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  switch (action.type) {
    case types.SET_SOCKET:
      return action.payload
    default:
      return currentState
  }
}