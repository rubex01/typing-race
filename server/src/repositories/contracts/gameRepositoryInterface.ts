import {game} from "@/models/game";

export interface gameRepositoryInterface {
    store(game: game): Promise<game>;
    update(game: game): Promise<game>;
    getById(gameId: string): Promise<game|undefined>;
    destroy(gameId: string): Promise<void>;
    exists(gameId: string): Promise<boolean>;
    getAll(): Promise<game[]>;
    clear(gameId: string): Promise<void>;
}
