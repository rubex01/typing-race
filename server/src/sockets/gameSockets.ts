import { ioServer } from "@/server";
import container from "../container";
import {gameService} from "@/services/gameService";

export const gameSockets = () => {
    const service = container.resolve(gameService);

    ioServer.on('connection', (socket) => {
        socket.on('join', (room, data) => {
            service.playerJoinedRoom(socket, room, data);

            socket.on('disconnect', () => {
                service.playerDisconnected(socket, room);
            });
        });

        socket.on('leave', (gameId) => {
            service.playerDisconnected(socket, gameId);
        });

        socket.on('gameEvent', (gameId, data) => {
            service.sendGameData(socket, gameId, data);
        });
    });
}
