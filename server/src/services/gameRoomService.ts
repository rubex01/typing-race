import {inject, injectable} from "tsyringe";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {game} from "@/models/game";
import {socketService} from "@/services/socketService";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {player} from "@/models/player";
import symbols from "@/symbols";
import {wordRepositoryInterface} from "@/repositories/contracts/wordRepositoryInterface";

@injectable()
export class gameRoomService {

    constructor(
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
        @inject(symbols.socketService) private socketService: socketService,
        @inject(symbols.wordRepositoryInterface) private wordRepository: wordRepositoryInterface,
    ) {
    }

    joinGame = async (gameId: string, socketId: string, data: {playerId: string}) => {
        const gameToJoin = await this.getOrCreateGame(gameId);
        if (gameToJoin.hasStarted()) {
            return;
        }

        console.log('joining game', gameId);

        this.socketService.join(socketId, gameId);
        const playerToAdd = new player(socketId, data.playerId, gameId);
        await this.playerRepository.storePlayer(playerToAdd);
    }

    leaveGame = async (socketId: string) => {
        await this.playerRepository.destroyBySocketId(socketId);
    }

    getOrCreateGame = async (gameId: string) => {
        const game = await this.gameRepository.getById(gameId);
        if (game) {
            return game;
        }

        return await this.createGame(gameId);
    }

    createGame = async (gameId: string) => {
        const words = await this.wordRepository.getRandomWords(50);
        const newGame = new game(
            gameId,
            null,
            words,
        )
        return await this.gameRepository.store(newGame);
    }
}