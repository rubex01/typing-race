import { ioServer } from "@/server";
import container from "../container";
import {gameRoomService} from "@/services/gameRoomService";
import {gamePlayService} from "@/services/gamePlayService";

export const gameSockets = () => {
    const roomService = container.resolve(gameRoomService);
    const playService = container.resolve(gamePlayService);

    ioServer.on('connection', (socket) => {
        socket.on('join', async (gameId, data) => {
            await roomService.joinGame(gameId, socket.id, data);

            socket.on('disconnect', async () => {
                await roomService.leaveGame(socket.id)
            });
        });

        socket.on('leave', async () => {
            await roomService.leaveGame(socket.id)
        });

        socket.on('gameEvent', async (gameId, data) => {
            await playService.announceGameProgression(socket.id, gameId, data);
        });
    });
}
