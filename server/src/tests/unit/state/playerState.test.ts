import container from "@/container";
import {playerState} from "@/states/playerState";
import {player} from "@/models/player";

describe('playerState Test Suite', () => {
    let state: playerState;
    let testPlayer: player;

    beforeEach(() => {
        state = container.resolve(playerState);
        testPlayer = new player(
            'socket',
            'name',
            'gameid',
        )
    });

    it('should save a game', () => {
        state.save(testPlayer.getGameId(), testPlayer);
        const savedPlayer = state.get(testPlayer.getGameId());
        expect(savedPlayer).toEqual(testPlayer);
    });

    it('should get a player by ID', () => {
        state.save(testPlayer.getGameId(), testPlayer);
        const retrievedPlayer = state.get(testPlayer.getGameId());
        expect(retrievedPlayer).toEqual(testPlayer);
    });

    it('should return undefined for a non-existent player', () => {
        const retrievedPlayer = state.get('non-existent-id');
        expect(retrievedPlayer).toBeUndefined();
    });

    it('should remove a player', () => {
        state.save(testPlayer.getGameId(), testPlayer);
        state.remove(testPlayer.getGameId());
        const retrievedPlayer = state.get(testPlayer.getGameId());
        expect(retrievedPlayer).toBeUndefined();
    });

    it('should check if a player exists', () => {
        state.save(testPlayer.getGameId(), testPlayer);
        const exists = state.exists(testPlayer.getGameId());
        expect(exists).toBe(true);
    });

    it('should return false if a player does not exist', () => {
        const exists = state.exists('non-existent-id');
        expect(exists).toBe(false);
    });

    it('should clear all players', () => {
        state.save(testPlayer.getGameId(), testPlayer);
        state.clear();
        const allPlayers= state.getAll();
        expect(allPlayers).toEqual([]);
    });
});
