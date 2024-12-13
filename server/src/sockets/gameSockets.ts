import {ioServer} from "@/server";
import container from "../container";
import {gameRoomService} from "@/services/gameRoomService";
import {gamePlayService} from "@/services/gamePlayService";
import {authService} from "@/services/authService";

export const gameSockets = () => {
    const roomService = container.resolve(gameRoomService);
    const playService = container.resolve(gamePlayService);
    const authenticationService = container.resolve(authService);

    ioServer.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        try {
            socket.user = await authenticationService.authorize(token);
        }
        catch { /* empty */ }
        next();
    });

    ioServer.on('connection', (socket) => {
        socket.on('join', async (gameId) => {
            await roomService.joinGame(gameId, socket.id, socket.user);

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
