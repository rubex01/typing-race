import {game} from "@/models/game";
import container from "@/container";
import {gameRoomService} from "@/services/gameRoomService";
import {player} from "@/models/player";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import symbols from "@/symbols";
import {gameRepository} from "@/repositories/state/gameRepository";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";

export const checkToRemoveGame = async (player: player) => {
    const playerRepository = container.resolve<playerRepositoryInterface>(symbols.playerRepositoryInterface);
    const playerCount = await playerRepository.countPlayersForGameId(player.getGameId())
    if (playerCount >= 2) {
        return;
    }

    const gameRepository = container.resolve<gameRepositoryInterface>(symbols.gameRepositoryInterface);
    const game = await gameRepository.getById(player.getGameId())
    if (!game) {
        return;
    }

    const service = container.resolve(gameRoomService);
    await service.removeGame(game);
}