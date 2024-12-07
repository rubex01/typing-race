import container from "@/container";
import {gameStateInterface} from "@/states/contracts/gameStateInterface";
import {gameState} from "@/states/gameState";
import {game} from "@/models/game";

describe('gameState Test Suite', () => {
    let state: gameStateInterface;
    let testGame: game;

    beforeEach(() => {
        state = container.resolve(gameState);
        testGame = new game(
            '123',
            new Map(),
            new Date(),
            ['hello', 'world'],
            0,
            null,
        );
    });

    it('should save a game', () => {
        state.save(testGame.getGameId(), testGame);
        const savedGame = state.get(testGame.getGameId());
        expect(savedGame).toEqual(testGame);
    });

    it('should get a game by ID', () => {
        state.save(testGame.getGameId(), testGame);
        const retrievedGame = state.get(testGame.getGameId());
        expect(retrievedGame).toEqual(testGame);
    });

    it('should return undefined for a non-existent game', () => {
        const retrievedGame = state.get('non-existent-id');
        expect(retrievedGame).toBeUndefined();
    });

    it('should remove a game', () => {
        state.save(testGame.getGameId(), testGame);
        state.remove(testGame.getGameId());
        const retrievedGame = state.get(testGame.getGameId());
        expect(retrievedGame).toBeUndefined();
    });

    it('should check if a game exists', () => {
        state.save(testGame.getGameId(), testGame);
        const exists = state.exists(testGame.getGameId());
        expect(exists).toBe(true);
    });

    it('should return false if a game does not exist', () => {
        const exists = state.exists('non-existent-id');
        expect(exists).toBe(false);
    });

    it('should get all games', () => {
        const game2 = new game(
            '456',
            new Map(),
            new Date(),
            ['foo', 'bar'],
            1,
            null,
        );

        state.save(testGame.getGameId(), testGame);
        state.save(game2.getGameId(), game2);

        const allGames = state.getAll();
        expect(allGames).toEqual([testGame, game2]);
    });

    it('should clear all games', () => {
        state.save(testGame.getGameId(), testGame);
        state.clear();
        const allGames = state.getAll();
        expect(allGames).toEqual([]);
    });
});
