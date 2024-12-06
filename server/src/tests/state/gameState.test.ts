import container from "@/container";
import { Game } from "@/types/game";
import {gameStateInterface} from "@/states/contracts/gameStateInterface";
import symbols from "@/symbols";
import {gameState} from "@/states/gameState";

describe('gameState Test Suite', () => {
    let state: gameStateInterface;
    let game: Game;

    beforeEach(() => {
        state = container.resolve(gameState);
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

    it('should save a game', () => {
        state.save(game.gameId, game);
        const savedGame = state.get(game.gameId);
        expect(savedGame).toEqual(game);
    });

    it('should get a game by ID', () => {
        state.save(game.gameId, game);
        const retrievedGame = state.get(game.gameId);
        expect(retrievedGame).toEqual(game);
    });

    it('should return undefined for a non-existent game', () => {
        const retrievedGame = state.get('non-existent-id');
        expect(retrievedGame).toBeUndefined();
    });

    it('should remove a game', () => {
        state.save(game.gameId, game);
        state.remove(game.gameId);
        const retrievedGame = state.get(game.gameId);
        expect(retrievedGame).toBeUndefined();
    });

    it('should check if a game exists', () => {
        state.save(game.gameId, game);
        const exists = state.exists(game.gameId);
        expect(exists).toBe(true);
    });

    it('should return false if a game does not exist', () => {
        const exists = state.exists('non-existent-id');
        expect(exists).toBe(false);
    });

    it('should get all games', () => {
        const game2: Game = {
            gameId: '456',
            players: new Map(),
            startTime: new Date(),
            words: ['foo', 'bar'],
            finalLetterIndex: 1,
            winner: null,
            destructTimer: null,
        };

        state.save(game.gameId, game);
        state.save(game2.gameId, game2);

        const allGames = state.getAll();
        expect(allGames).toEqual([game, game2]);
    });

    it('should clear all games', () => {
        state.save(game.gameId, game);
        state.clear();
        const allGames = state.getAll();
        expect(allGames).toEqual([]);
    });
});
