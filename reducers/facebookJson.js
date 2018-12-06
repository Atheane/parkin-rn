import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  // console.log("facebookJson reducer")

  switch (action.type) {  
    case types.SET_USERDATA:
      // console.log("in types.SET_USERDATA, action.payload", action.payload)
      return action.payload
    default:
      return currentState
  }
}