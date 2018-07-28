import socketIOClient from 'socket.io-client'

const endpoint = "http://ced8e4df.ngrok.io"
// const endpoint = "http://localhost:3000"

export const socket = socketIOClient(endpoint, {transports: ['websocket']})

socket.on('connect_error', (err) => {
  console.log(err)
})

socket.on('disconnect', () => {
  console.log("Disconnected Socket!")
})