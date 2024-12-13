export interface socketServiceInterface {
    join(socketId: string, room: string): void;
    emit(room: string, type: string, data: emitable): void;
    emitToSocket(socketId: string, event: string, data: emitable): void;
}

export interface emitable {
    getEmitData(): object;
}