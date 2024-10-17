import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // TODO: get this from env

const socket = io(SOCKET_URL);

export default socket;
