import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  console.log("userReducer")
  console.log("action.type", action.type)

  switch (action.type) {
    case types.SET_USERDATA:
      console.log("in types.SET_USER, action.payload",
      {...currentState, userInfo: action.payload })
      return {...currentState, facebookJson: action.payload }
    case types.LOG_USER:
      console.log("in types.LOG_USER, action.payload", 
      {...currentState, firstConnection: action.payload })
      return {...currentState, firstConnection: action.payload }  
    default:
      console.log("in default, currentState", currentState)
      return currentState
  }
}