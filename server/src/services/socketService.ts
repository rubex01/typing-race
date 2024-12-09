import {injectable} from "tsyringe";
import {Server} from "socket.io";
import {ioServer} from "@/server";

@injectable()
export class socketService {

    private io: Server = ioServer;

    join = (socketId: string, room: string) => {
        const socket = this.io.sockets.sockets.get(socketId);
        if (socket) {
            socket.join(room);
        }
    }

    emit = (room: string, type: string, data: any) => {
        this.io.to(room).emit(room, {
            type,
            data: {
                ...data,
            },
        });
    }

}