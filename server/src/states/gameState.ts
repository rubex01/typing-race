import {injectable} from "tsyringe";
import {Game} from "@/types/game";
import {gameStateInterface} from "@/states/contracts/gameStateInterface";

@injectable()
export class gameState implements gameStateInterface {
    private state: Map<string, Game> = new Map();

    save(gameId: string, game: Game): void {
        this.state.set(gameId, game);
    }

    get(gameId: string): Game | undefined {
        return this.state.get(gameId);
    }

    remove(gameId: string): void {
        this.state.delete(gameId);
    }

    exists(gameId: string): boolean {
        return this.state.has(gameId);
    }

    getAll(): Game[] {
        return Array.from(this.state.values());
    }

    clear(): void {
        this.state.clear();
    }
}
