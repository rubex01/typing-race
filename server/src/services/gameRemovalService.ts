import {inject, injectable} from "tsyringe";
import symbols from "@/symbols";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {game} from "@/models/game";

@injectable()
export class gameRemovalService {

    private REMOVE_GAME_WITH_AMOUNT_OF_PLAYERS = 1;

    constructor(
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
    ) {
    }

    async shouldRemoveGame(gameId: string): Promise<boolean> {
        const playerCount = await this.playerRepository.countPlayersForGameId(gameId);
        return playerCount <= this.REMOVE_GAME_WITH_AMOUNT_OF_PLAYERS;
    }

    removeGameIfShouldRemove = async (gameId: string) => {
        const shouldRemove = await this.shouldRemoveGame(gameId);
        if (!shouldRemove) {
            return;
        }

        const game = await this.gameRepository.getById(gameId);
        if (!game) {
            return;
        }
        await this.removeGame(game);
    }

    removeGame = async (game: game) => {
        await this.gameRepository.destroy(game.getGameId());
    }
}