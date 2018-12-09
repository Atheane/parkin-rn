import socketIOClient from 'socket.io-client'
import { setSocket, onSpots, onArrival, toggleModal } from '../actions'
import { NavigationActions } from 'react-navigation'

// const endpoint = "https://parkin-mesn.herokuapp.com"
const endpoint = "http://localhost:3000"


export default (dispatch) => {
  // console.log("in setupSocket")
  let counter = 0
  const socket = socketIOClient(endpoint, {transports: ['websocket']})
  
  socket.on('connect', () => {
    console.log(socket.id, ' is connected')
    // console.log("setSocket action for socket", socket)
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
    // console.log(data)
    counter = 0
    dispatch(onSpots(data))
  })

  socket.on("ON_ARRIVAL", (data) => {
    // console.log("ON_ARRIVAL data")
    // console.log(data)
    if (counter === 0) {
      counter +=1
      dispatch(onArrival(data))
      dispatch(toggleModal())
      dispatch(NavigationActions.navigate({routeName: 'Modal'}))
    }
  })

  return socket
}



