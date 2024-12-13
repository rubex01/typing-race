import {emitable} from "@/services/contracts/socketServiceInterface";

export class gameProgressionValueObject implements emitable {
    constructor(
        private letterIndex: number,
        private playerName: string,
        private playerId: string
    ) {
    }

    getEmitData = () => {
        return {
            letterIndex: this.letterIndex,
            playerName: this.playerName,
            playerId: this.playerId
        }
    }
}