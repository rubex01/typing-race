import {beforeEach, expect} from "vitest";
import {game} from "@/models/game";
import {player} from "@/models/player";
import container from "@/container";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import symbols from "@/symbols";

describe('Winning a game', () => {
    let testGame: game;
    let testPlayer1: player;
    let testPlayer2: player;

    beforeEach(() => {
        testGame = new game(
            'gameId',
            new Date(),
            ['word1', 'word2', 'word3']
        );
        testPlayer1 = new player('socketid1', 'name1', 'gameId', null);
        testPlayer2 = new player('socketid2', 'name2', 'gameId', null);
    });

    it('has winner after a player finished', async () => {
        const gameRepository = container.resolve<gameRepositoryInterface>(symbols.gameRepositoryInterface);
        await gameRepository.store(testGame);

        testPlayer1.setLetterIndex(11);
        testPlayer2.setLetterIndex(15);

        const result = await gameRepository.getById(testGame.getGameId())
        expect(result?.getWinner()).toEqual(testPlayer2);
    });

    it('has no winner when no player finished yet', async () => {
        const gameRepository = container.resolve<gameRepositoryInterface>(symbols.gameRepositoryInterface);
        await gameRepository.store(testGame);

        testPlayer1.setLetterIndex(11);
        testPlayer2.setLetterIndex(14);

        const result = await gameRepository.getById(testGame.getGameId())
        expect(result?.getWinner()).toBeNull();
    });

    it('does not change the winner after another player finishes', async () => {
        const gameRepository = container.resolve<gameRepositoryInterface>(symbols.gameRepositoryInterface);
        await gameRepository.store(testGame);

        testPlayer1.setLetterIndex(15);
        testPlayer2.setLetterIndex(15);

        const result = await gameRepository.getById(testGame.getGameId())
        expect(result?.getWinner()).toEqual(testPlayer1);
    });
});