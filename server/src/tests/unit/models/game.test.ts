import {game} from "@/models/game";
import {expect} from "vitest";
import {player} from "@/models/player";

describe('game model Test Suite', () => {

    it('can create a game', () => {
        const testGame = new game('gameId', new Date(), ['word1', 'word2']);
        expect(testGame).toBeInstanceOf(game);
    });

    it('can check if game has started', () => {
        const testGame = new game('gameId', new Date(), ['word1', 'word2']);
        expect(testGame.hasStarted()).toBe(true);
    });

    it('can check if game has not been started when start is not set', () => {
        const testGame = new game('gameId', null, ['word1', 'word2']);
        expect(testGame.hasStarted()).toBe(false);
    });

    it('can check if game has not been started when start is in the future', () => {
        const testGame = new game('gameId', new Date(new Date().getTime() + 1000), ['word1', 'word2']);
        expect(testGame.hasStarted()).toBe(false);
    });

    it('can get game id', () => {
        const testGame = new game('gameId', new Date(), ['word1', 'word2']);
        expect(testGame.getGameId()).toBe('gameId');
    });

    it('can get final letter index', () => {
        const testGame = new game('gameId', new Date(), ['word1', 'word2']);
        expect(testGame.getFinalLetterIndex()).toBe(10);
    });

    it('can get start time', () => {
        const time = new Date();
        const testGame = new game('gameId', time, ['word1', 'word2']);
        expect(testGame.getStartTime()).toEqual(time);
    });

    it('can get words', () => {
        const testGame = new game('gameId', new Date(), ['word1', 'word2']);
        expect(testGame.getWords()).toEqual(['word1', 'word2']);
    });

    it('can get winner', () => {
        const testGame = new game('gameId', new Date(), ['word1', 'word2']);
        expect(testGame.getWinner()).toBe(null);
    });

    it('can set winner', () => {
        const testGame = new game('gameId', new Date(), ['word1', 'word2']);
        const testPlayer = new player('socket', 'name', 'gameid', null);
        testGame.setWinner(testPlayer);
        expect(testGame.getWinner()).toBe(testPlayer);
    });
});