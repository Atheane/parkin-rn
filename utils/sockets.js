import socketIOClient from 'socket.io-client'

const endpoint = "http://a33359ae.ngrok.io"
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
  console.log("emitUserPosition", userPosition)
  socket.emit("userPosition", userPosition)
}

export const emitTokenPushNotification = (token) => {
  console.log("emitTokenPushNotification", token)
  socket.emit("tokenPushNotification", token)
}

export const emitSelectSpot = (e) => {
  console.log("emitSelectSpot", e.nativeEvent.coordinate)
  socket.emit("selectSpot", e.nativeEvent.coordinate)
}

socket.on('connect_error', (err) => {
  console.log(err)
})

socket.on('disconnect', () => {
  console.log("Disconnected Socket!")
})