import 'socket.io';

declare module 'socket.io' {
    import {User} from "@prisma/client";

    interface Socket {
        user?: User
    }
}