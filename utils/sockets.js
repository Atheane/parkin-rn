import socketIOClient from 'socket.io-client'

const endpoint = "http://c44daa5d.ngrok.io"
// const endpoint = "http://localhost:3000"

export const socket = socketIOClient(endpoint, {transports: ['websocket']})

export const onSpotsAroundMe = (callback) => {
  socket.on("spotsAroundMe", callback)
}  

export const emitUserPosition = (userPosition) => {
  socket.emit("userPosition", userPosition)
}

export const emitUnactivateSpot = (e) => {
  console.log("unactivateSpot", e.nativeEvent.coordinate)
  socket.emit("unactivateSpot", e.nativeEvent.coordinate)
}

socket.on('connect_error', (err) => {
  console.log(err)
})

socket.on('disconnect', () => {
  console.log("Disconnected Socket!")
})