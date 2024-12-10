import { describe, it, expect, beforeEach } from 'vitest';
import container from "@/container";
import { gameRepository } from "@/repositories/state/gameRepository";
import { game } from "@/models/game";

describe('Game repository test', () => {
    let repository: gameRepository;
    let testGame: game;

    beforeEach(() => {
        repository = container.resolve(gameRepository);

        testGame = new game(
            '123',
            new Date(),
            ['hello', 'world'],
        );
    });

    it('should store a game', async () => {
        const result = await repository.store(testGame);
        expect(result).toEqual(testGame);
    });

    it('should get a game by ID', async () => {
        await repository.store(testGame);
        const result = await repository.getById(testGame.getGameId());
        expect(result).toEqual(testGame);
    });

    it('should return undefined for a non-existing game', async () => {
        const result = await repository.getById('non-existent-id');
        expect(result).toBeUndefined();
    });

    it('should destroy a game', async () => {
        await repository.store(testGame);
        await repository.destroy(testGame.getGameId());
        const result = await repository.getById(testGame.getGameId());
        expect(result).toBeUndefined();
    });

    it('should check if a game exists', async () => {
        await repository.store(testGame);
        const exists = await repository.exists(testGame.getGameId());
        expect(exists).toBe(true);
    });

    it('should return false if a game does not exist', async () => {
        const exists = await repository.exists('non-existent-id');
        expect(exists).toBe(false);
    });

    it('should get all games', async () => {
        const game2 = new game(
            '456',
            new Date(),
            ['foo', 'bar'],
        );

        await repository.store(testGame);
        await repository.store(game2);

        const result = await repository.getAll();
        expect(result).toEqual([testGame, game2]);
    });

    it('should clear all games', async () => {
        await repository.store(testGame);
        await repository.clear();
        const result = await repository.getAll();
        expect(result).toEqual([]);
    });
});
