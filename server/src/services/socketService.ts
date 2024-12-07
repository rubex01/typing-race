import {injectable} from "tsyringe";
import {Server} from "socket.io";
import {ioServer} from "@/server";

@injectable()
export class socketService {

    private io: Server = ioServer;

    join = (socketId: string, room: string) => {
        console.log('joining room', room);
        const socket = this.io.sockets.sockets.get(socketId);
        if (socket) {
            socket.join(room);
        }
    }

    emit = (room: string, type: string, data: any) => {
        console.log('emitting to room', room, type, data);
        this.io.to(room).emit(room, {
            type,
            data: {
                ...data,
            },
        });
    }

}