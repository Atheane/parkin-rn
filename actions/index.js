
import { Permissions, Location } from 'expo'
import * as types from '../constants/ActionTypes'


export const setConnection = (socketId) => {
  return {
    type: types.SET_CONNECTION,
    payload: socketId
  }
}

export const setUser = (user) => {
  return {
    type: types.SET_USER,
    payload: user
  }
}

export const emitUser = (socket, user) => {
  socket.emit('EMIT_USER', user)
  return {
    type: types.SET_USER,
    payload: true
  }
}

export const setPosition = (token, socket) => {

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
      const userPosition = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0221
      }
      if (userPosition && token) {
        socket.emit("userPosition", { userPosition, token })
      }
      return userPosition
    }
  }

  return {
    type: types.SET_POSITION,
    payload: getLocationAsync()
  }
}

export const getSpots = (spots) => {
  return {
    type: types.GET_SPOTS,
    payload: spots
  }
}