import {Game} from "@/types/game";

export interface gameRepositoryInterface {
    store(game: Game): Promise<Game>;
    getById(gameId: string): Promise<Game|undefined>;
    destroy(gameId: string): Promise<void>;
    exists(gameId: string): Promise<boolean>;
    getAll(): Promise<Game[]>;
    clear(gameId: string): Promise<void>;
}
