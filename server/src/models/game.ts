import {player} from "@/models/player";

export class game extends model{

    private finalLetterIndex: number = 0;

    private winner: player | null = null;

    constructor(
        private gameId: string,
        private startTime: Date | null,
        private words: string[],
    ) {
        super();
        this.calculateFinalLetterIndex();
    }

    calculateFinalLetterIndex = () => {
        this.finalLetterIndex = this.words.join('').length;
    }

    getGameId = () => this.gameId

    hasStarted = () => {
        return this.startTime !== null && this.startTime <= new Date();
    }

    getFinalLetterIndex = () => {
        return this.finalLetterIndex;
    }

    setStartTime = (startTime: Date) => {
        this.startTime = startTime;
    }

    getStartTime = () => {
        return this.startTime;
    }

    getWords = () => {
        return this.words;
    }

    getWinner = () => {
        return this.winner;
    }

    setWinner = (winner: player) => {
        this.winner = winner;
    }
}