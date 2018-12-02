
import { Permissions, Location } from 'expo'
import * as types from '../constants/ActionTypes'


export const setSocket = (socket) => {
  return {
    type: types.SET_SOCKET,
    payload: socket
  }
}

// export const emitUserInfo = (socket, userInfo) => {
//   socket.emit('EMIT_USERINFO', userInfo)
//   return {
//     type: types.EMIT_USERINFO,
//     payload: true
//   }
// }

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