import {player} from "@/models/player";
import container from "@/container";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import symbols from "@/symbols";
import {gameRepository} from "@/repositories/state/gameRepository";
import {gameRoomService} from "@/services/gameRoomService";

export const checkToStartGame = async (player: player) => {
    console.log('checkToStartGame!');
    const gameId = player.getGameId();

    const playerRepository = container.resolve<playerRepositoryInterface>(symbols.playerRepositoryInterface);
    const playerCount = await playerRepository.countPlayersForGameId(gameId);
    console.log('playerCount', playerCount);
    if (playerCount < 2) {
        return;
    }

    const gameRepository = container.resolve<gameRepository>(symbols.gameRepositoryInterface);
    const game = await gameRepository.getById(gameId);
    if (!game) {
        return;
    }

    const service = container.resolve(gameRoomService);
    service.startGame(game)
}