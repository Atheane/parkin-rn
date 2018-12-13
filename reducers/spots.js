import * as types from '../constants/ActionTypes'
import {isEqual} from 'lodash'

export default (currentState = null, action) => {
  // console.log("spots reducer")

  switch (action.type) {
    case types.ON_SPOTS:
      console.log("in types.ON_SPOTS, action.payload", action.payload)
      return action.payload
    case types.ON_DELETESPOT:
      console.log("in types.ON_DELETESPOT, action.payload", action.payload)
      console.log("return :", currentState.filter((spot) => !isEqual(spot, action.payload) ))
      return currentState.filter((spot) => !isEqual(spot, action.payload) )
    case types.ON_NEWSPOT:
      console.log("in types.ON_NEWSPOT, action.payload", action.payload)
      return [action.payload , ...currentState]  
    default:
      return currentState
  }
}