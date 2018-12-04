
import * as types from '../constants/ActionTypes'


export const setSocket = (socket) => {
  console.log("setSocket action")
  return {
    type: types.SET_SOCKET,
    payload: socket
  }
}

export const emitUserData = (socket, facebookJson) => {
  socket.emit('EMIT_USERDATA', facebookJson)
  return {
    type: types.EMIT_USERDATA,
    payload: true
  }
}

export const emitUserPosition = (socket, userPosition, token) => {
  socket.emit('EMIT_USERPOSITION', {userPosition, token})
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