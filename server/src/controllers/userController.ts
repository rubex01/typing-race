import { Request, Response } from 'express';
import {userRepositoryInterface} from "@/repositories/contracts/userRepositoryInterface";
import {injectable, inject} from "tsyringe";
import symbols from "@/symbols";
import {authService} from "@/services/authService";

@injectable()
export class userController {

    constructor(
        @inject(symbols.userRepositoryInterface) private userRepository: userRepositoryInterface,
        @inject(symbols.authService) private authService: authService,
    ) {}

    store = async (request: Request, response: Response): Promise<void> => {
        const user = await this.userRepository.storePlayer({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        });
        response.status(200).json(user)
    }

    me = async (request: Request, response: Response): Promise<void> => {
        response.status(200).json({
            ...request.user
        })
    }

    authenticate = async (request: Request, response: Response): Promise<void> => {
        const token = await this.authService.authenticate(request.body.email, request.body.password);
        if (!token) {
            response.status(401).json({
                message: 'Authentication failed',
            })
            return;
        }

        response.status(200).json({token})
    }
}
