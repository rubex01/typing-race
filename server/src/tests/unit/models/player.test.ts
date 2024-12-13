import {player} from "@/models/player";

describe('player model Test Suite', () => {
    let testPlayer: player;

    beforeEach(() => {
        testPlayer = new player(
            'socket',
            'name',
            'gameid',
            null,
        );
    });

    it('should create a player', () => {
        expect(testPlayer).toBeInstanceOf(player);
        expect(testPlayer.getSocketId()).toBe('socket');
        expect(testPlayer.getPlayerId()).toBe('name');
        expect(testPlayer.getGameId()).toBe('gameid');
    });

    it('should emit event when letter index is updated', () => {
        vi.spyOn(testPlayer, 'emit');
        testPlayer.setLetterIndex(1);
        expect(testPlayer.emit).toHaveBeenCalledWith('letterIndexUpdated');
    });

    it('should call added event listener', () => {
        const listener = vi.fn();
        testPlayer.on('test', listener);
        testPlayer.emit('test');
        expect(listener).toHaveBeenCalledWith(testPlayer);
    });
});