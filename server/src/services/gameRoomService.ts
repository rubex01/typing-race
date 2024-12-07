import {inject, injectable} from "tsyringe";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {game} from "@/models/game";
import {socketService} from "@/services/socketService";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {player} from "@/models/player";
import symbols from "@/symbols";

@injectable()
export class gameRoomService {

    private START_GAME_IN_SECONDS = 3;

    constructor(
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
        @inject(symbols.socketService) private socketService: socketService,
    ) {
    }

    joinGame = async (gameId: string, socketId: string, data: {playerId: string}) => {
        const gameToJoin = await this.getOrCreateGame(gameId);
        if (gameToJoin.hasStarted()) {
            return;
        }

        this.socketService.join(socketId, gameId);
        const playerToAdd = new player(socketId, data.playerId, gameId);
        await this.playerRepository.storePlayer(playerToAdd);
    }

    leaveGame = async (socketId: string) => {
        await this.playerRepository.destroyBySocketId(socketId);
    }

    startGame = (game: game) => {
        const startTime = new Date(new Date().getTime() + (this.START_GAME_IN_SECONDS * 1000));
        game.setStartTime(startTime)

        this.socketService.emit(game.getGameId(), 'gameStart', {
            startTime: game.getStartTime(),
            words: game.getWords(),
        });
    }

    removeGame = async (game: game) => {
        await this.gameRepository.destroy(game.getGameId());
    }

    getOrCreateGame = async (gameId: string) => {
        const game = await this.gameRepository.getById(gameId);
        if (game) {
            return game;
        }

        return await this.createGame(gameId);
    }

    createGame = async (gameId: string) => {
        const words = ['hello', 'world', 'this', 'is', 'a', 'test'];
        const newGame = new game(
            gameId,
            null,
            words,
        )
        return await this.gameRepository.store(newGame);
    }
}