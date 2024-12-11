import { io } from 'socket.io-client'

let socket = null;

const recreateSocket = () => {
  const token = localStorage.getItem('authToken')
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: {
      token
    },
  })
}
recreateSocket();

export { socket, recreateSocket }
