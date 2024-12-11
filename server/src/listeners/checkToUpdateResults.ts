import {player} from "@/models/player";
import {gameResultService} from "@/services/gameResultService";
import container from "@/container";

export const checkToUpdateResults = async (player: player) => {
    const service = container.resolve(gameResultService);
    await service.storeGameResultIfPlayerFinished(player);
}