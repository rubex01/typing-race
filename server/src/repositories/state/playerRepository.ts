import {inject, injectable} from "tsyringe";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {playerStateInterface} from "@/states/contracts/playerStateInterface";
import {player} from "@/models/player";
import symbols from "@/symbols";

@injectable()
export class playerRepository implements playerRepositoryInterface {

    constructor(
        @inject(symbols.playerStateInterface) private playerState: playerStateInterface,
    ) {
    }

    storePlayer(player: player): Promise<player> {
        this.playerState.save(player.getSocketId(), player);
        player.emit(model.EVENT_STORED);
        return Promise.resolve(player);
    }

    destroyBySocketId(socketId: string): Promise<void> {
        const player = this.playerState.get(socketId);
        this.playerState.remove(socketId);
        player?.emit(model.EVENT_DESTROYED);
        return Promise.resolve();
    }

    getBySocketId = async (socketId: string): Promise<player | undefined> => {
        const player = this.playerState.get(socketId);
        return Promise.resolve(player);
    }

    updatePlayer = async (player: player): Promise<player> => {
        this.playerState.save(player.getSocketId(), player);
        return Promise.resolve(player);
    }

    countPlayersForGameId = async (gameId: string): Promise<number> => {
        const players = this.playerState.getAll();
        const playersInGame = players.filter(player => player.getGameId() === gameId);
        return Promise.resolve(playersInGame.length);
    }
}