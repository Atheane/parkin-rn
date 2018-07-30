import socketIOClient from 'socket.io-client'

const endpoint = "http://eef6b416.ngrok.io"
// const endpoint = "http://localhost:3000"

export const socket = socketIOClient(endpoint, {transports: ['websocket']})

export const onSpotsAroundMe = (callback) => {
  console.log("onSpotAroundMe")
  socket.on("spotsAroundMe", callback)
}  

export const onSpotNearMe = (callback) => {
  console.log("onSpotNearMe")
  socket.on("spotNearMe", callback)
}

export const emitUserPosition = (userPosition) => {
  console.log("userPosition", userPosition)
  socket.emit("userPosition", userPosition)
}

export const emitTokenPushNotification = (token) => {
  console.log("tokenPushNotification", token)
  socket.emit("tokenPushNotification", token)
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