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
    if (action.type === 'SET_SPOTS') {
      return action.payload
    } else {
      return currentState
    }
  }
}

