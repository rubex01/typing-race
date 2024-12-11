import {inject, injectable} from "tsyringe";
import symbols from "@/symbols";
import {resultRepositoryInterface} from "@/repositories/contracts/resultRepositoryInterface";
import { Request, Response } from 'express';

@injectable()
export class resultController {

    constructor(
        @inject(symbols.resultRepositoryInterface) private resultRepository: resultRepositoryInterface,
    ) {}

    average = async (request: Request, response: Response) => {
        const result = await this.resultRepository.getAverageWPMByUserId(request.user?.id ?? 0);
        response.status(200).json({
            average: result,
        });
    }

}