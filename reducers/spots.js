import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  console.log("spots reducer")

  switch (action.type) {
    case types.ON_SPOTS:
      console.log("in types.ON_SPOTS, action.payload", action.payload)
      return action.payload
    default:
      return currentState
  }
}