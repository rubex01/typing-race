import container from "@/container";
import {player} from "@/models/player";
import {gameRemovalService} from "@/services/gameRemovalService";

export const checkToRemoveGame = async (player: player) => {
    const gameId = player.getGameId();
    const service = container.resolve(gameRemovalService);
    await service.removeGameIfShouldRemove(gameId);
}