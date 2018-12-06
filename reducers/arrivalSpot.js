import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  // console.log("userPosition reducer")

  switch (action.type) {
    case types.ON_ARRIVAL:
      // console.log("in types.ON_ARRIVAL, action.payload", action.payload)
      return action.payload
    default:
      return currentState
  }
}