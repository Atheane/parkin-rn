import * as types from '../constants/ActionTypes'

export default (currentState, action) => {
  if (currentState === undefined) {
    return [
      {
        name: 'InitSpot',
        coords: {
          latitude: 48.886,
          longitude: 2.322
        }
      }
    ]
  } else {
    if (action.type === types.SET_SPOTS) {
      return action.payload
    } else {
      return currentState
    }
  }
}

