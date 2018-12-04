import socketIOClient from 'socket.io-client'
import { setSocket, onSpots, onArrival } from '../actions'
import { NavigationActions } from 'react-navigation'

const endpoint = "https://parkin-mesn.herokuapp.com"

export default (dispatch) => {
  console.log("in setupSocket")
  const socket = socketIOClient(endpoint, {transports: ['websocket']})
  
  socket.on('connect', () => {
    console.log(socket.id, ' is connected')
    console.log("setSocket action for socket", socket)
    dispatch(setSocket(socket))

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

  socket.on("ON_SPOTS", (data) => {
    console.log(data)
    dispatch(onSpots(data))
  })

  socket.on("ON_ARRIVAL", (data) => {
    console.log("<3 <3 <3 <3 <3 <3, ON_ARRIVAL data")
    console.log(data)
    dispatch(onArrival(data))
    dispatch(NavigationActions.navigate({routeName: 'Modal'}))
  })

  return socket
}



