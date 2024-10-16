const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow cross-origin requests from any domain
  },
});

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room);
  })

  socket.on('gameEvent', (gameId, data) => {
    io.to(gameId).emit(gameId, data);
  })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
