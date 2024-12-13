import {inject, injectable} from "tsyringe";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {game} from "@/models/game";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {player} from "@/models/player";
import symbols from "@/symbols";
import {wordRepositoryInterface} from "@/repositories/contracts/wordRepositoryInterface";
import {socketServiceInterface} from "@/services/contracts/socketServiceInterface";
import {User} from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import {playerIdValueObject} from "@/valueObjects/playerIdValueObject";

@injectable()
export class gameRoomService {

    AMOUNT_OF_WORDS = 3;

    constructor(
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
        @inject(symbols.socketServiceInterface) private socketService: socketServiceInterface,
        @inject(symbols.wordRepositoryInterface) private wordRepository: wordRepositoryInterface,
    ) {
    }

    joinGame = async (gameId: string, socketId: string, user: User|null) => {
        const gameToJoin = await this.getOrCreateGame(gameId);
        if (gameToJoin.hasStarted()) {
            return;
        }

        this.socketService.join(socketId, gameId);
        const playerToAdd = new player(socketId, uuidv4(), gameId, user);
        await this.playerRepository.storePlayer(playerToAdd);
        this.socketService.emitToSocket(socketId, 'receivePlayerId', new playerIdValueObject(playerToAdd.getPlayerId()));
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