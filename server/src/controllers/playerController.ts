import { Request, Response } from 'express';
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {injectable, inject} from "tsyringe";
import types from "@/types";
import {authService} from "@/services/authService";

@injectable()
export class playerController {

    constructor(
        @inject(types.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
        @inject(types.authService) private authService: authService,
    ) {}

    store = async (request: Request, response: Response) => {
        const user = await this.playerRepository.storePlayer({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        });
        response.status(200).json(user)
    }

    authenticate = async (request: Request, response: Response) => {
        const userId = await this.authService.authenticate(request.body.email, request.body.password);
        if (!userId) {
            return response.status(401).json({
                message: 'Authentication failed',
            })
        }

        const token = await this.authService.createJWTForUserId(userId);
        response.status(200).json({token})
    }
}
