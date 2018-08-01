import socketIOClient from 'socket.io-client'

const endpoint = "http://0aa34edc.ngrok.io"
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

export const emitUserInfo = (userInfo) => {
  socket.emit("userInfo", userInfo)
}

export const emitInitialUserPosition = ({userPosition, token}) => {
  console.log("emitInitialUserPosition", userPosition, token)
  socket.emit("initialUserPosition", {userPosition, token})
}

export const emitMovingUserPosition = (userPosition) => {
  console.log("emitMovingUserPosition", userPosition)
  socket.emit("movingUserPosition", userPosition)
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

socket.on('connect', () => {
  console.log(socket.id, ' is connected')
  socket.on('disconnect', () => {
    console.log(socket.id, ' is disconnected')
    socket.on('reconnect', (attemptNumber) => {
      console.log(socket.id, ' is reconnected')
    })    
  })
})

