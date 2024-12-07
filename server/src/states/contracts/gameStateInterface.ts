import {game} from "@/models/game";

export interface gameStateInterface {
    save(gameId: string, game: game): void;
    get(gameId: string): game | undefined;
    remove(gameId: string): void;
    exists(gameId: string): boolean;
    getAll(): game[];
    clear(): void;
}