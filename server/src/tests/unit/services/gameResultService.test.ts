import {beforeEach } from "vitest";
import container from "@/container";
import {player} from "@/models/player";
import {gameResultService} from "@/services/gameResultService";

describe('Gameplay service test suite', () => {
    let service: gameResultService;

    beforeEach(() => {
        service = container.resolve(gameResultService);
    });

    describe('calculateWPMForPlayerByStartTime', () => {
        test.each([
            {
                description: '200 letters in 120 seconds',
                letters: 200,
                seconds: 120,
                expectedWPM: 25,
            },
            {
                description: '100 letters in 60 seconds',
                letters: 100,
                seconds: 60,
                expectedWPM: 25,
            },
            {
                description: '300 letters in 150 seconds',
                letters: 300,
                seconds: 150,
                expectedWPM: 30,
            },
            {
                description: '50 letters in 30 seconds',
                letters: 50,
                seconds: 30,
                expectedWPM: 25,
            },
            {
                description: '0 letters in 60 seconds',
                letters: 0,
                seconds: 60,
                expectedWPM: 0,
            },
            {
                description: '250 letters in 100 seconds',
                letters: 250,
                seconds: 100,
                expectedWPM: 37,
            },
            {
                description: '400 letters in 200 seconds',
                letters: 400,
                seconds: 200,
                expectedWPM: 30,
            },
            {
                description: '123 letters in 98 seconds',
                letters: 123,
                seconds: 98,
                expectedWPM: 18,
            },
            {
                description: '555 letters in 333 seconds',
                letters: 555,
                seconds: 333,
                expectedWPM: 25,
            },
            {
                description: '999 letters in 1000 seconds',
                letters: 999,
                seconds: 1000,
                expectedWPM: 14,
            },
        ])('$description should calculate WPM correctly', ({ letters, seconds, expectedWPM }) => {
            const mockPlayer = {
                getLetterIndex: vi.fn().mockReturnValue(letters),
            } as unknown as player;

            const startTime = new Date('2023-10-01T10:00:00Z');
            const finishTime = new Date(startTime.getTime() + seconds * 1000);

            const wpm = service.calculateWPMForPlayerByStartTime(mockPlayer, startTime, finishTime);

            expect(wpm).toBe(expectedWPM);
        });
    });
});