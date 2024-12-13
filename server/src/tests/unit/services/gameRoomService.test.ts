import {beforeEach, expect} from "vitest";
import container from "@/container";
import {gameRoomService} from "@/services/gameRoomService";
import symbols from "@/symbols";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";

describe('Winning a game', () => {
    let service: gameRoomService;

    beforeEach(() => {
        service = container.resolve(gameRoomService);
    });

    it('generates a game with the right amount of words', async () => {
        const game = await service.createGame('random');
        expect(game.getWords().length).toEqual(service.AMOUNT_OF_WORDS);
    });

    it('creates a game with the right id', async () => {
        const game = await service.createGame('random');
        expect(game.getGameId()).toEqual('random');
    });

    it('creates a game when one does not exist', async () => {
        const game = await service.getOrCreateGame('random');
        expect(game.getGameId()).toEqual('random');
    });

    it('returns an existing game when it exists', async () => {
        await service.createGame('random');
        const game = await service.getOrCreateGame('random');
        expect(game.getGameId()).toEqual('random');
    });

    it('does join a game when it has not started yet', async () => {
        const game = await service.createGame('random');
        await service.joinGame(game.getGameId(), 'socketId', null);

        const playerRepository = container.resolve<playerRepositoryInterface>(symbols.playerRepositoryInterface);
        const player = await playerRepository.getBySocketId('socketId');
        expect(player?.getGameId()).toEqual(game.getGameId());
    });
});