const deltas = {
  latitudeDelta: 0.0522,
  longitudeDelta: 0.0221
}

export default (currentState, action) => {
  if (currentState === undefined) {
    return {}
  } else {
    if (action.type === 'SET_POSITION') {
      return action.payload
    } else {
      return currentState
    }
  }
}