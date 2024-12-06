import { Request, Response } from 'express';
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {injectable, inject} from "tsyringe";
import symbols from "@/symbols";
import {authService} from "@/services/authService";
import {AuthRequest} from "@/middleware/authorization";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {gameRepository} from "@/repositories/state/gameRepository";
import {Game} from "@/types/game";

@injectable()
export class playerController {

    constructor(
        @inject(symbols.playerRepositoryInterface) private playerRepository: playerRepositoryInterface,
        @inject(symbols.authService) private authService: authService,
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
    ) {}

    store = async (request: Request, response: Response) => {
        const user = await this.playerRepository.storePlayer({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        });
        response.status(200).json(user)
    }

    me = async (request: AuthRequest, response: Response) => {
        response.status(200).json({
            ...request.user
        })
    }

    authenticate = async (request: Request, response: Response) => {
        const token = await this.authService.authenticate(request.body.email, request.body.password);
        if (!token) {
            return response.status(401).json({
                message: 'Authentication failed',
            })
        }

        response.status(200).json({token})
    }

    test = async (request: AuthRequest, response: Response) => {
        response.status(200).json({
            message: 'You are authorized',
            user: request.user
        })
    }
}
