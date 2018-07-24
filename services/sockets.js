import socketIOClient from 'socket.io-client'

const endpoint = "http://40a005d3.ngrok.io"

export const socket = socketIOClient(endpoint)

// export const subscribeToConnection = (callback) => {
//     socket.on("spotsAroundMe", (spots) => {
//         console.log("listening on spotsAroundMe")
//         callback(spots)
//     })
// }

  socket.on('connect_error', (err) => {
    console.log(err)
  })

  socket.on('disconnect', () => {
    console.log("Disconnected Socket!")
  })