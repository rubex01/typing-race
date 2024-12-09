import {inject, injectable} from "tsyringe";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {game} from "@/models/game";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {player} from "@/models/player";
import symbols from "@/symbols";
import {wordRepositoryInterface} from "@/repositories/contracts/wordRepositoryInterface";
import {socketServiceInterface} from "@/services/contracts/socketServiceInterface";
import {User} from "@prisma/client";

@injectable()
export class gameRoomService {

    AMOUNT_OF_WORDS = 50;

    constructor(
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
        @inject(symbols.socketServiceInterface) private socketService: socketServiceInterface,
        @inject(symbols.wordRepositoryInterface) private wordRepository: wordRepositoryInterface,
    ) {
    }

    joinGame = async (gameId: string, socketId: string, data: {playerId: string, user: User|null}) => {
        const gameToJoin = await this.getOrCreateGame(gameId);
        if (gameToJoin.hasStarted()) {
            return;
        }

        this.socketService.join(socketId, gameId);
        const playerToAdd = new player(socketId, data.playerId, gameId, data.user);
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
        const words = await this.wordRepository.getRandomWords(this.AMOUNT_OF_WORDS);
        const newGame = new game(
            gameId,
            null,
            words,
        )
        return await this.gameRepository.store(newGame);
    }
}