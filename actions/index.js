
import * as types from '../constants/ActionTypes'

export const setSocket = (socket) => {
  console.log("setSocket action")
  return {
    type: types.SET_SOCKET,
    payload: socket
  }
}

export const logUser = (emptyAsyncStorage) => {
  return {
    type: types.LOG_USER,
    payload: emptyAsyncStorage
  }
}

export const setUserData = (facebookJson) => {
  return {
    type: types.SET_USERDATA,
    payload: facebookJson
  }
}

export const emitUserData = (socket, facebookJson) => {
  socket.emit(types.EMIT_USERDATA, facebookJson)
  return {
    type: types.EMIT_USERDATA,
    payload: true
  }
}

export const setPosition = (location) => {
  return {
    type: types.SET_POSITION,
    payload: location
  }
}

export const emitUserPosition = (socket, userPosition, token) => {
  socket.emit(types.EMIT_USERPOSITION, {userPosition, token})
  return {
    type: types.EMIT_USERPOSITION,
    payload: true
  }
}

export const onSpots = (spots) => {
  return {
    type: types.ON_SPOTS,
    payload: spots
  }
}

export const emitSelectSpot = (socket, location, token) => {
  socket.emit(types.EMIT_SELECTSPOT, {coord: location, token})
  return {
    type: types.EMIT_SELECTSPOT,
    payload: true
  }
}

export const setWatchId = (watchId) => {
  return {
    type: types.SET_WATCHID,
    payload: watchId
  }
}

// EMIT_MOVINGUSERPOSITION in WithLocation. to-do find a way to bring it back here.

export const onArrival = (data) => {
  return {
    type: types.ON_ARRIVAL,
    payload: data
  }
}














