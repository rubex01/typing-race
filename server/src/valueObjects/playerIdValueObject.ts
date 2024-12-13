import {emitable} from "@/services/contracts/socketServiceInterface";

export class playerIdValueObject implements emitable {
    constructor(
        private playerId: string,
    ) {
    }

    getEmitData = () => {
        return {
            playerId: this.playerId,
        }
    }
}