import socketIOClient from 'socket.io-client'

const endpoint = "http://65add2d2.ngrok.io"

export const socket = socketIOClient(endpoint)

socket.on('connect_error', (err) => {
  console.log(err)
})

socket.on('disconnect', () => {
  console.log("Disconnected Socket!")
})