import {inject, injectable} from "tsyringe";
import Symbols from "@/symbols";
import {socketService} from "@/services/socketService";
import symbols from "@/symbols";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {game} from "@/models/game";
import {player} from "@/models/player";

@injectable()
export class gameWinnerService {

    constructor(
        @inject(Symbols.socketService) private socketService: socketService,
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
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

        this.socketService.emit(game.getGameId(), "gameWinner", {
                winner: winnerPlayerId
            },
        );
    }
}