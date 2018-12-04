import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  console.log("watchIdReducer")

  switch (action.type) {
    case types.SET_WATCHID:
      console.log("in types.SET_WATCHID, action.payload", action.payload)
      return action.payload
    default:
      return currentState
  }
}