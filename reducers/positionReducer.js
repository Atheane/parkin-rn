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