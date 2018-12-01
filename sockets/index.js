import socketIOClient from 'socket.io-client'
import * as types from '../constants/ActionTypes'
import { EVENT_LISTENERS } from '../constants/EventListeners'

import { setConnection, getSpots } from '../actions'

const endpoint = "http://localhost:3000"

export default (dispatch) => {
  console.log("in setupSocket")
  const socket = socketIOClient(endpoint, {transports: ['websocket']})
  
  socket.on('connect', () => {
    console.log(socket.id, ' is connected')
    dispatch(setConnection(socket.id))
    socket.on('disconnect', () => {
      console.log(socket.id, ' is disconnected')
      socket.on('reconnect', (attemptNumber) => {
        console.log(socket.id, ' is reconnected')
      })    
    })
  })

  socket.on('connect_error', (err) => {
    console.log(err)
  })

  // socket.on("GET_SPOTS", (data) => {
  //   console.log("<3 <3 <3 <3 <3 <3, data")
  //   console.log(data)
  //   if (event === types.GET_SPOTS) {
  //     dispatch(getSpots(data))
  //   }
  // })

  // EVENT_LISTENERS.forEach((event) => {
  //   console.log("<3 <3 <3 <3 <3 <3, event")
  //   console.log(event)
  //   socket.on(event, (data) => {
  //     console.log("<3 <3 <3 <3 <3 <3, data")
  //     console.log(data)
  //     if (event === types.GET_SPOTS) {
  //       dispatch(getSpots(data))
  //     }
  //   })
  // })
  return socket
}



