import {player} from "@/models/player";
import container from "@/container";
import {gameStartService} from "@/services/gameStartService";

export const checkToStartGame = async (player: player) => {
    const gameId = player.getGameId();
    const service = container.resolve(gameStartService);
    await service.startGameIfReady(gameId);
}