import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  // console.log("userPosition reducer")

  switch (action.type) {
    case types.SET_POSITION:
      // console.log("in types.SET_POSITION, action.payload", action.payload)
      return action.payload
    default:
      return currentState
  }
}