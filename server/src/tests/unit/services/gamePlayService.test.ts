import {beforeEach } from "vitest";
import container from "@/container";
import {gamePlayService} from "@/services/gamePlayService";
import {game} from "@/models/game";
import {player} from "@/models/player";

describe('Gameplay service test suite', () => {
    let service: gamePlayService;

    beforeEach(() => {
        service = container.resolve(gamePlayService);
    });

    it('rejects data package when game has no start date', async () => {
        const testGame = new game('gameId', null, ['word1', 'word2']);
        const testPlayer = new player('socketId', 'playerId', 'gameId', null);

        const result = service.validateDataPackage(testGame, testPlayer);
        expect(result).toBe(false);
    });

    it('rejects data package when game has start date in the future', async () => {
        const dateInFuture = new Date();
        dateInFuture.setSeconds(dateInFuture.getSeconds() + 10);
        const testGame = new game('gameId', dateInFuture, ['word1', 'word2']);
        const testPlayer = new player('socketId', 'playerId', 'gameId', null);

        const result = service.validateDataPackage(testGame, testPlayer);
        expect(result).toBe(false);
    });

    it('rejects data package when player is not part of the game', async () => {
        const date = new Date();
        date.setSeconds(date.getSeconds() - 10);
        const testGame = new game('gameId', date, ['word1', 'word2']);
        const testPlayer = new player('socketId', 'playerId', 'otherGameId', null);

        const result = service.validateDataPackage(testGame, testPlayer);
        expect(result).toBe(false);
    });

    it('allows package when player is part of game and game has started', async () => {
        const date = new Date();
        date.setSeconds(date.getSeconds() - 10);
        const testGame = new game('gameId', date, ['word1', 'word2']);
        const testPlayer = new player('socketId', 'playerId', 'gameId', null);

        const result = service.validateDataPackage(testGame, testPlayer);
        expect(result).toBe(true);
    });
});