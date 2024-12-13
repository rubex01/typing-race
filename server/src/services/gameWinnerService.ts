import {inject, injectable} from "tsyringe";
import Symbols from "@/symbols";
import symbols from "@/symbols";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {game} from "@/models/game";
import {player} from "@/models/player";
import {socketServiceInterface} from "@/services/contracts/socketServiceInterface";
import {gameWinnerValueObject} from "@/valueObjects/gameWinnerValueObject";

@injectable()
export class gameWinnerService {

    constructor(
        @inject(Symbols.socketServiceInterface) private socketService: socketServiceInterface,
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
    ) {
    }

    playerWonGame = (game: game, player: player): boolean => {
        return (
            game.getWinner() === null &&
            player.getLetterIndex() >= game.getFinalLetterIndex()
        );
    }

    setWinnerIfPlayerWonGame = async (player: player) => {
        const game = await this.gameRepository.getById(player.getGameId());
        if (!game) {
            return;
        }

        const playerWins = this.playerWonGame(game, player);
        if (!playerWins) {
            return;
        }

        await this.setWinnerOnGame(game, player);
        await this.announceWinner(game);
    }

    setWinnerOnGame = async (game: game, player: player) => {
        game.setWinner(player);
        await this.gameRepository.update(game);
    }

    announceWinner = async (game: game) => {
        const winnerPlayerId = game.getWinner()?.getPlayerId();
        if (!winnerPlayerId) {
            return;
        }

        this.socketService.emit(game.getGameId(), "gameWinner", new gameWinnerValueObject(winnerPlayerId));
    }
}