import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {
  console.log("emptyAsyncStorage reducer")

  switch (action.type) {
    case types.LOG_USER:
      console.log("in types.LOG_USER, action.payload", action.payload)
      return action.payload    
    default:
      return currentState
  }
}