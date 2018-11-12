import socketIOClient from 'socket.io-client'

const endpoint = "http://8cf9be7a.ngrok.io"
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

export const emitMovingUserPosition = ({userPosition, token}) => {
  console.log("emitMovingUserPosition", userPosition, token )
  socket.emit("movingUserPosition", {userPosition, token})
}

export const emitTokenPushNotification = ({pushToken, token}) => {
  console.log("emitTokenPushNotification", pushToken, token)
  socket.emit("tokenPushNotification", {pushToken, token})
}

export const emitSelectSpot = ({coord, token}) => {
  console.log("emitSelectSpot", coord, token)
  socket.emit("selectSpot", {coord, token})
}

export const emitDeleteSpot = ({coord, token}) => {
  console.log("emitDeleteSpot", coord, token)
  socket.emit("deleteSpot", {coord, token})
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

