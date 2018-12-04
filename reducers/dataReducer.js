import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  console.log("data reducer")
  console.log("action.type", action.type)

  switch (action.type) {
    case types.SET_POSITION:
      console.log("in types.SET_POSITION, action.payload", action.payload)
      return {...currentState, userPosition: action.payload}
    case types.ON_SPOTS:
      console.log("in types.ON_SPOTS, action.payload", action.payload)
      return {...currentState, spots: action.payload}
    case types.SET_WATCHID:
      console.log("in types.SET_WATCHID, action.payload", action.payload)
      return {...currentState, watchId: action.payload}
    default:
      console.log("in default, currentState", currentState)
      return currentState
  }
}