import {beforeEach, expect} from "vitest";
import {game} from "@/models/game";
import {player} from "@/models/player";
import container from "@/container";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import symbols from "@/symbols";
import {Result, User} from "@prisma/client";
import {userRepositoryInterface} from "@/repositories/contracts/userRepositoryInterface";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {resultRepositoryInterface} from "@/repositories/contracts/resultRepositoryInterface";

describe('Result saving of game', () => {
    let testGame: game;
    let user1: User;
    let testPlayer1: player;
    let testPlayer2: player;

    beforeEach(async () => {
        vi.useFakeTimers();
        const userRepository = container.resolve<userRepositoryInterface>(symbols.userRepositoryInterface);
        user1 = await userRepository.storePlayer({
            name: 'name1',
            email: 'email1',
            password: 'password1'
        })

        const start = new Date();
        testGame = new game(
            'gameId',
            start,
            ['word1', 'word2', 'word3']
        );
        testPlayer1 = new player('socketid1', 'name1', 'gameId', user1);
        testPlayer2 = new player('socketid2', 'name2', 'gameId', null);

        const gameRepository = container.resolve<gameRepositoryInterface>(symbols.gameRepositoryInterface);
        const playerRepository = container.resolve<playerRepositoryInterface>(symbols.playerRepositoryInterface);
        await Promise.all([
            gameRepository.store(testGame),
            playerRepository.storePlayer(testPlayer1),
            playerRepository.storePlayer(testPlayer2),
        ])
    });

    it('saves result after logged in player finishes', async () => {
        vi.setSystemTime(new Date().getTime() + 60000);
        testPlayer1.setLetterIndex(11);
        testPlayer2.setLetterIndex(15);
        testPlayer1.setLetterIndex(15);

        const resultRepository = container.resolve<resultRepositoryInterface>(symbols.resultRepositoryInterface);

        let result: Result|null = null;
        await vi.waitUntil(async () => {
            result = await resultRepository.getLatestByUserId(user1.id);
            return result !== null;
        });

        expect(result!.wpm).toEqual(3);
    });
});