import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  switch (action.type) {
    case types.SET_USERINFO:
      return action.payload
    case types.SET_POSITION:
      return action.payload
    default:
      return currentState
  }
}