import {inject, injectable} from "tsyringe";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {socketService} from "@/services/socketService";
import {game} from "@/models/game";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {player} from "@/models/player";
import symbols from "@/symbols";

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
        @inject(symbols.socketService) private socketService: socketService,
    ) {
    }

    announceGameProgression = async (socketId: string, gameId: string, data: gameProgressionData) => {
        const game = await this.gameRepository.getById(gameId);
        const player = await this.playerRepository.getBySocketId(socketId);
        if (
            !game ||
            !player ||
            !this.validateDataPackage(game, player, data)
        ) {
            return;
        }

        this.socketService.emit(gameId, 'gameEvent', data);

        player.setLetterIndex(data.letterIndex);
        await this.playerRepository.updatePlayer(player);
    }

    validateDataPackage = (game: game, player: player, data: gameProgressionData): boolean => {
        return (
            game.hasStarted() &&
            player.getGameId() === game.getGameId() &&
            data.playerId === player.getPlayerId()
        );
    }
}