import {resultRepositoryInterface, storeResultData} from "@/repositories/contracts/resultRepositoryInterface";
import { Result } from "@prisma/client";
import {inject, injectable} from "tsyringe";
import symbols from "@/symbols";
import {prismaType} from "@/clients/prismaClient";

@injectable()
export class resultRepository implements resultRepositoryInterface {

    constructor(
        @inject(symbols.prismaClient) private readonly prisma: prismaType,
    ) {
    }

    storeResult = async (resultData: storeResultData): Promise<Result> => {
        return this.prisma.result.create({
            data: {
                user: {
                    connect: {
                        id: resultData.userId
                    }
                },
                wpm: resultData.wpm
            }
        })
    }

    getAverageWPMByUserId = async (userId: number): Promise<number|null> => {
        const result = await this.prisma.result.aggregate({
            _avg: {
                wpm: true,
            },
            where: {
                userId: userId,
            },
        });
        return result._avg.wpm ? Math.round(result._avg.wpm) : null;
    }
}