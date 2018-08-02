import socketIOClient from 'socket.io-client'

const endpoint = "http://0929b274.ngrok.io"
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
  console.log("emitInitialUserPosition", userPosition, token )
  socket.emit("initialUserPosition", {userPosition, token})
}

export const emitMovingUserPosition = (userPosition) => {
  console.log("emitMovingUserPosition", userPosition, )
  socket.emit("movingUserPosition", {userPosition, token})
}

export const emitTokenPushNotification = (pushToken) => {
  console.log("emitTokenPushNotification", pushToken, )
  socket.emit("tokenPushNotification", {pushToken, token})
}

export const emitSelectSpot = (coord) => {
  console.log("emitSelectSpot", coord)
  socket.emit("selectSpot", {coord, token})
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

