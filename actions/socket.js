
import * as types from '../constants/ActionTypes'


export const setSocket = (socket) => {
  console.log("setSocket action")
  return {
    type: types.SET_SOCKET,
    payload: socket
  }
}

export const emitUser = (socket, user) => {
  socket.emit('EMIT_USER', user)
  return {
    type: types.EMIT_USER,
    payload: true
  }
}

// export const emitPosition = (socket, userPosition, token) => {
//   socket.emit('EMIT_POSITION', {userPosition, token})
//   return {
//     type: types.EMIT_POSITION,
//     payload: true
//   }
// }

// export const onSpots = (spots) => {
//   return {
//     type: types.GET_SPOTS,
//     payload: spots
//   }
// }