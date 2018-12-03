import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  console.log("socket reducer")
  console.log("action.type", action.type)

  switch (action.type) {
    case types.SET_SOCKET:
      console.log("in types.SET_SOCKET, action.payload", action.payload)
      return action.payload
    default:
      console.log("in default, currentState", currentState)
      return currentState
  }
}