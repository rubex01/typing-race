import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {inject, injectable} from "tsyringe";
import {Game} from "@/types/game";
import {gameStateInterface} from "@/states/contracts/gameStateInterface";
import symbols from "@/symbols";

@injectable()
export class gameRepository implements gameRepositoryInterface {
    constructor(@inject(symbols.gameStateInterface) private gameState: gameStateInterface) {}

    store = async (game: Game): Promise<Game> => {
        this.gameState.save(game.gameId, game);
        return Promise.resolve(game);
    }

    getById = (gameId: string): Promise<Game | undefined> => {
        const game = this.gameState.get(gameId);
        return Promise.resolve(game);
    }

    destroy = (gameId: string): Promise<void> => {
        this.gameState.remove(gameId);
        return Promise.resolve();
    }

    exists = (gameId: string): Promise<boolean> => {
        const exists = this.gameState.exists(gameId);
        return Promise.resolve(exists)
    }

    getAll = (): Promise<Game[]> => {
        const games = this.gameState.getAll();
        return Promise.resolve(games);
    }

    clear = (): Promise<void> => {
        this.gameState.clear();
        return Promise.resolve();
    }
}