import socketIOClient from 'socket.io-client'

const endpoint = "http://ced8e4df.ngrok.io"
// const endpoint = "http://localhost:3000"

export const socket = socketIOClient(endpoint, {transports: ['websocket']})

export const unactivateSpot = (e) => {
  console.log("unactivateSpot", e.nativeEvent.coordinate)
  socket.emit("unactivateSpot", e.nativeEvent.coordinate)
}

socket.on('connect_error', (err) => {
  console.log(err)
})

socket.on('disconnect', () => {
  console.log("Disconnected Socket!")
})