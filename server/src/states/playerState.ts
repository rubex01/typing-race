import {injectable} from "tsyringe";
import {player} from "@/models/player";
import {playerStateInterface} from "@/states/contracts/playerStateInterface";

@injectable()
export class playerState implements playerStateInterface {
    private state: Map<string, player> = new Map();

    save(playerId: string, player: player): void {
        this.state.set(playerId, player);
    }

    get(playerId: string): player | undefined {
        return this.state.get(playerId);
    }

    remove(playerId: string): void {
        this.state.delete(playerId);
    }

    exists(playerId: string): boolean {
        return this.state.has(playerId);
    }

    getAll(): player[] {
        return Array.from(this.state.values());
    }

    clear(): void {
        this.state.clear();
    }
}
