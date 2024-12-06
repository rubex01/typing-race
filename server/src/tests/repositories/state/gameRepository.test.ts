import container from "@/container";
import { Game } from "@/types/game";
import {gameRepository} from "@/repositories/state/gameRepository";

describe('Game repository test', () => {
    let repository: gameRepository;
    let game: Game;

    beforeEach(() => {
        repository = container.resolve(gameRepository);

        game = {
            gameId: '123',
            players: new Map(),
            startTime: new Date(),
            words: ['hello', 'world'],
            finalLetterIndex: 0,
            winner: null,
            destructTimer: null,
        };
    });

    it('should store a game', async () => {
        const result = await repository.store(game);
        expect(result).toEqual(game);
    });

    it('should get a game by ID', async () => {
        await repository.store(game);
        const result = await repository.getById(game.gameId);
        expect(result).toEqual(game);
    });

    it('should return undefined for a non-existing game', async () => {
        const result = await repository.getById('non-existent-id');
        expect(result).toBeUndefined();
    });

    it('should destroy a game', async () => {
        await repository.store(game);
        await repository.destroy(game.gameId);
        const result = await repository.getById(game.gameId);
        expect(result).toBeUndefined();
    });

    it('should check if a game exists', async () => {
        await repository.store(game);
        const exists = await repository.exists(game.gameId);
        expect(exists).toBe(true);
    });

    it('should return false if a game does not exist', async () => {
        const exists = await repository.exists('non-existent-id');
        expect(exists).toBe(false);
    });

    it('should get all games', async () => {
        const game2: Game = {
            gameId: '456',
            players: new Map(),
            startTime: new Date(),
            words: ['foo', 'bar'],
            finalLetterIndex: 1,
            winner: null,
            destructTimer: null,
        };

        await repository.store(game);
        await repository.store(game2);

        const result = await repository.getAll();
        expect(result).toEqual([game, game2]);
    });

    it('should clear all games', async () => {
        await repository.store(game);
        await repository.clear();
        const result = await repository.getAll();
        expect(result).toEqual([]);
    });
});
