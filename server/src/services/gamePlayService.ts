import {inject, injectable} from "tsyringe";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {game} from "@/models/game";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {player} from "@/models/player";
import symbols from "@/symbols";
import {socketServiceInterface} from "@/services/contracts/socketServiceInterface";
import {gameProgressionValueObject} from "@/valueObjects/gameProgressionValueObject";

type gameProgressionData = {
    letterIndex: number,
    playerName: string,
    playerId: string
}

@injectable()
export class gamePlayService {

    constructor(
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
        @inject(symbols.socketServiceInterface) private socketService: socketServiceInterface,
    ) {
    }

    announceGameProgression = async (socketId: string, gameId: string, data: gameProgressionData) => {
        const game = await this.gameRepository.getById(gameId);
        const player = await this.playerRepository.getBySocketId(socketId);
        if (
            !game ||
            !player ||
            !this.validateDataPackage(game, player)
        ) {
            return;
        }

        const gameProgression = new gameProgressionValueObject(data.letterIndex, data.playerName, player.getPlayerId());
        this.socketService.emit(gameId, 'gameEvent', gameProgression);

        player.setLetterIndex(data.letterIndex);
        await this.playerRepository.updatePlayer(player);
    }

    validateDataPackage = (game: game, player: player): boolean => {
        return (
            game.hasStarted() &&
            player.getGameId() === game.getGameId()
        );
    }
}