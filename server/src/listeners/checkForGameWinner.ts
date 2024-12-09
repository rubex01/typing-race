import {player} from "@/models/player";
import container from "@/container";
import {gameWinnerService} from "@/services/gameWinnerService";

export const checkForGameWinner = async (player: player) => {
    const service = container.resolve(gameWinnerService);
    await service.setWinnerIfPlayerWonGame(player);
}