import {emitable} from "@/services/contracts/socketServiceInterface";


export class gameWinnerValueObject implements emitable {
    constructor(
        private winner: string,
    ) {
    }

    getEmitData = () => {
        return {
            winner: this.winner,
        }
    }
}