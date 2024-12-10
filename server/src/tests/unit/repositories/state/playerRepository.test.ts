import { describe, it, expect, beforeEach, vi } from 'vitest';
import container from "@/container";
import { playerRepository } from "@/repositories/state/playerRepository";
import { player } from "@/models/player";
import {model} from "@/models/model";

describe('Player Repository Test', () => {
    let repository: playerRepository;
    let testPlayer: player;

    beforeEach(() => {
        repository = container.resolve(playerRepository);

        testPlayer = new player(
            'socket123',
            'player123',
            'game123',
        );
    });

    it('Should store a player', async () => {
        const emitSpy = vi.spyOn(testPlayer, 'emit');
        const result = await repository.storePlayer(testPlayer);
        const storedPlayer = await repository.getBySocketId(testPlayer.getSocketId());

        expect(storedPlayer).toEqual(testPlayer);
        expect(result).toEqual(testPlayer);
        expect(emitSpy).toHaveBeenCalledWith(model.EVENT_STORED);
    });

    it('Should destroy a player', async () => {
        const emitSpy = vi.spyOn(testPlayer, 'emit');
        await repository.storePlayer(testPlayer);
        await repository.destroyBySocketId(testPlayer.getSocketId());

        const result = await repository.getBySocketId(testPlayer.getSocketId());

        expect(result).toBeUndefined();
        expect(emitSpy).toHaveBeenCalledWith(model.EVENT_DESTROYED);
    });

    it('Should get a player by socket ID', async () => {
        await repository.storePlayer(testPlayer);
        const result = await repository.getBySocketId(testPlayer.getSocketId());
        expect(result).toEqual(testPlayer);
    });

    it('should update a player', async () => {
        await repository.storePlayer(testPlayer);
        testPlayer.setLetterIndex(999);

        const result = await repository.updatePlayer(testPlayer);
        const updatedPlayer = await repository.getBySocketId(testPlayer.getSocketId());

        expect(result).toEqual(testPlayer);
        expect(updatedPlayer).toEqual(testPlayer);
    });

    it('should count players for a game ID', async () => {
        const player2 = new player('socket456', 'player456', 'game123');
        await repository.storePlayer(testPlayer);
        await repository.storePlayer(player2);

        const result = await repository.countPlayersForGameId('game123');
        expect(result).toBe(2);
    });
});
