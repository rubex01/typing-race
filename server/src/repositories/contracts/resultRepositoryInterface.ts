import {Result} from "@prisma/client";

export interface storeResultData {
    userId: number
    wpm: number
}

export interface resultRepositoryInterface {
    storeResult(resultData: storeResultData): Promise<Result>
    getAverageWPMByUserId(userId: number): Promise<number|null>
}