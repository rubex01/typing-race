import {emitable} from "@/services/contracts/socketServiceInterface";

export class gameStartValueObject implements emitable {
    constructor(
        private startTime: Date,
        private words: string[],
    ) {
    }

    getEmitData = () => {
        return {
            startTime: this.startTime,
            words: this.words,
        }
    }
}