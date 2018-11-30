export default (currentState, action) => {
  if (currentState === undefined) {
    return {
      latitude: 48.886384,
      longitude: 2.322400,
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0221
    }
  } else {
    if (action.type === 'SET_POSITION') {
      return action.payload
    } else {
      return currentState
    }
  }
}