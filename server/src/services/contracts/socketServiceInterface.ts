export interface socketServiceInterface {
    join(socketId: string, room: string): void;
    emit(room: string, type: string, data: any): void;
}