import {player} from "@/models/player";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import container from "@/container";
import {gamePlayService} from "@/services/gamePlayService";
import symbols from "@/symbols";

export const checkForGameWinner = async (player: player) => {
    const gameId = player.getGameId();
    const gameRepository = container.resolve<gameRepositoryInterface>(symbols.gameRepositoryInterface);
    const game = await gameRepository.getById(gameId);

    if (!game || null !== game.getWinner()) {
        return;
    }

    if (player.getLetterIndex() < game.getFinalLetterIndex()) {
        return;
    }

    const service = container.resolve(gamePlayService);
    game.setWinner(player);
    await gameRepository.update(game);
    await service.announceWinner(game);
}