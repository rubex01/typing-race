import { createServer } from 'http';
import { Server } from 'socket.io';
import {gameSockets} from './sockets/gameSockets';
import apiRoutes from "./routes/api";
import express from "express";
import "@/container";
import cors from "cors";

const app = express();
export const server = createServer(app);
export const ioServer = new Server(server, {
    cors: {
        origin: '*',
    },
});

gameSockets();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
