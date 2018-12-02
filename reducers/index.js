import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  socketId: '',
  userPosition: {},
  spots: []
};

export default (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_CONNECTION:
      action.payload
      break
    case types.SET_POSITION:
      action.payload
      break
    case types.GET_SPOTS:
      action.payload
      break
    default:
      currentState
  }
}