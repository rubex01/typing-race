import {player} from "@/models/player";

export interface playerRepositoryInterface {
    storePlayer(playerData: player): Promise<player>
    destroyBySocketId(socketId: string): Promise<void>
    getBySocketId(socketId: string): Promise<player|undefined>
    updatePlayer(player: player): Promise<player>
    countPlayersForGameId(gameId: string): Promise<number>
}
