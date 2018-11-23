// const SET_POSITION = 'SET_POSITION'

export const setPosition = () => {
  const currentUserPosition = {
    latitude: 48.886384,
    longitude: 2.322400,
    ...deltas
  }
  return {
    type: 'SET_POSITION',
    payload: currentUserPosition
  }
}

export const setSpots = () => {
  const spots = [
    {
      name: '44x44',
      coords: {
        latitude: 48.886,
        longitude: 2.322
      }
    }
  ]
  return {
    type: 'SET_SPOTS',
    payload: spots
  }
}