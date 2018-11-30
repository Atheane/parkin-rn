
import { socket } from '../utils/sockets'
import { Permissions, Location } from 'expo'



export const setPosition = () => {

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
      const currentUserPosition = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0221
      }
      return currentUserPosition
    }
  }

  return {
    type: 'SET_POSITION',
    payload: getLocationAsync()
  }
}



export const getSpots = () => {

  const onSpotsAroundMePromise = () => {
    return new Promise((resolve, reject) => {
      socket.on("spotsAroundMe", callback(resolve, reject))
    })  
  }

  return {
    type: 'GET_SPOTS',
    payload: onSpotsAroundMePromise
  }
}