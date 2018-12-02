import * as types from '../constants/ActionTypes'

export default (currentState = null, action) => {{
  switch (action.type) {
    case types.SET_CONNECTION:
      return action.payload
    case types.SET_USERINFO:
      return action.payload
    case types.SET_POSITION:
      return action.payload
    case type.EMIT_USERINFO:
      return action.payload
    case type.EMIT_POSITION:
      return action.payload
    case types.GET_SPOTS:
      return action.payload
    default:
      return currentState
  }
}
}