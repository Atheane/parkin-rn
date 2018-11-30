
import { socket } from '../utils/sockets'
import { Permissions, Location } from 'expo'

const deltas = {
  latitudeDelta: 0.0522,
  longitudeDelta: 0.0221
}

export const setPosition = () => {

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...deltas
      }
    }
  }

  const currentUserPosition = getLocationAsync()

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