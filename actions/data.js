
import { Permissions, Location } from 'expo'
import * as types from '../constants/ActionTypes'


export const setPosition = () => {

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0221
      }
    }
  }

  return {
    type: types.SET_POSITION,
    payload: getLocationAsync()
  }
}
