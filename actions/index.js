
import { socket } from '../utils/sockets'

const deltas = {
  latitudeDelta: 0.0522,
  longitudeDelta: 0.0221
}

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

  const onSpotsAroundMePromise = () => {
    return new Promise((resolve, reject) => {
      socket.on("spotsAroundMe", callback(resolve, reject))
    })  
  }

  return {
    type: 'SET_SPOTS',
    payload: onSpotsAroundMePromise
  }
}