import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  console.log("socketReducer")
  console.log("action.type", action.type)
  switch (action.type) {
    case types.SET_SOCKET:
      console.log("in types.SET_SOCKET, action.payload", action.payload)
      return {...currentState, socketInstance: action.payload }
    case types.EMIT_USERPOSITION:
      console.log("in types.EMIT_USERPOSITION, action.payload", action.payload)
      return {...currentState, userPositionSent: action.payload }
    case types.ON_SPOTS:
      console.log("in types.ON_SPOTS, action.payload", action.payload)
      return {...currentState, spotsReceived: true}
    default:
      console.log("in default, currentState", currentState)
      return currentState
  }
}