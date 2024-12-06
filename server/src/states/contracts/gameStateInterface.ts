import {Game} from "@/types/game";

export interface gameStateInterface {
    save(gameId: string, game: Game): void;
    get(gameId: string): Game | undefined;
    remove(gameId: string): void;
    exists(gameId: string): boolean;
    getAll(): Game[];
    clear(): void;
}