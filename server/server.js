import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import GameService from "./services/gameService.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const gameService = GameService(io);

io.on('connection', (socket) => {
  socket.on('join', (room, data) => {
    gameService.playerJoinedRoom(socket, room, data);

    socket.on('disconnect', () => {
      gameService.playerDisconnected(socket, room);
    });
  });

  socket.on('leave', (gameId) => {
    gameService.playerDisconnected(socket, gameId);
  });

  socket.on('gameEvent', (gameId, data) => {
    gameService.sendGameData(socket, gameId, data)
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});