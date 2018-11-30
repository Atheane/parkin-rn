export default (currentState, action) => {
  if (currentState === undefined) {
    return []
  } else {
    if (action.type === 'SET_SPOTS') {
      return action.payload
    } else {
      return currentState
    }
  }
}

