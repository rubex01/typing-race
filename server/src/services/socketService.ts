import {injectable} from "tsyringe";
import {Server} from "socket.io";
import {ioServer} from "@/server";
import {emitable, socketServiceInterface} from "@/services/contracts/socketServiceInterface";

@injectable()
export class socketService implements socketServiceInterface {

    private io: Server = ioServer;

    join = (socketId: string, room: string) => {
        const socket = this.io.sockets.sockets.get(socketId);
        if (socket) {
            socket.join(room);
        }
    }

    emit = (room: string, type: string, data: emitable) => {
        this.io.to(room).emit(room, {
            type,
            data: data.getEmitData(),
        });
    }

    emitToSocket = (socketId: string, event: string, data: emitable) => {
        const socket = this.io.sockets.sockets.get(socketId);
        if (!socket) {
            return;
        }
        socket.emit(event, {
            type: event,
            data: data.getEmitData(),
        });
    }
}