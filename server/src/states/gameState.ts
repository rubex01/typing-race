import {injectable} from "tsyringe";
import {gameStateInterface} from "@/states/contracts/gameStateInterface";
import {game} from "@/models/game";

@injectable()
export class gameState implements gameStateInterface {
    private state: Map<string, game> = new Map();

    save(gameId: string, game: game): void {
        this.state.set(gameId, game);
    }

    get(gameId: string): game | undefined {
        return this.state.get(gameId);
    }

    remove(gameId: string): void {
        this.state.delete(gameId);
    }

    exists(gameId: string): boolean {
        return this.state.has(gameId);
    }

    getAll(): game[] {
        return Array.from(this.state.values());
    }

    clear(): void {
        this.state.clear();
    }
}
