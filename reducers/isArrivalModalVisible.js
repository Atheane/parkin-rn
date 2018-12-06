import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  // console.log("facebookJson reducer")

  switch (action.type) {  
    case types.TOGGLE_MODAL:
      // console.log("in types.TOGGLE_MODAL, action.payload", action.payload)
      return action.payload
    default:
      return currentState
  }
}