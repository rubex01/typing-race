import {player} from "@/models/player";

export interface playerStateInterface {
    save(socketId: string, player: player): void;
    get(socketId: string): player | undefined;
    remove(socketId: string): void;
    exists(socketId: string): boolean;
    getAll(): player[];
    clear(): void;
}