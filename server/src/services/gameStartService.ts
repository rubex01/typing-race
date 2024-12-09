import {inject, injectable} from "tsyringe";
import Symbols from "@/symbols";
import {socketService} from "@/services/socketService";
import symbols from "@/symbols";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {game} from "@/models/game";

@injectable()
export class gameStartService {

    private START_GAME_IN_SECONDS = 3;

    private START_GAME_WITH_AMOUNT_OF_PLAYERS = 2;

    constructor(
        @inject(Symbols.socketService) private socketService: socketService,
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
    ) {
    }

    async isGameReadyToStart(gameId: string): Promise<boolean> {
        const playerCount = await this.playerRepository.countPlayersForGameId(gameId);
        return playerCount >= this.START_GAME_WITH_AMOUNT_OF_PLAYERS;
    }

    startGameIfReady = async (gameId: string) => {
        const isReady = await this.isGameReadyToStart(gameId);
        if (!isReady) {
            return;
        }

        const game = await this.gameRepository.getById(gameId);
        if (!game) {
            return;
        }
        await this.startGame(game);
    }

    startGame = async (game: game) => {
        const startTime = new Date(new Date().getTime() + (this.START_GAME_IN_SECONDS * 1000));
        game.setStartTime(startTime)

        await this.gameRepository.update(game);
        this.socketService.emit(game.getGameId(), 'gameStart', {
            startTime: game.getStartTime(),
            words: game.getWords(),
        });
    }
}