import { Request, Response } from 'express';
import {userRepositoryInterface} from "@/repositories/contracts/userRepositoryInterface";
import {injectable, inject} from "tsyringe";
import symbols from "@/symbols";
import {authService} from "@/services/authService";
import {userRequest} from "@/middleware/authorization";

@injectable()
export class userController {

    constructor(
        @inject(symbols.userRepositoryInterface) private userRepository: userRepositoryInterface,
        @inject(symbols.authService) private authService: authService,
    ) {}

    store = async (request: Request, response: Response) => {
        const user = await this.userRepository.storePlayer({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        });
        response.status(200).json(user)
    }

    me = async (request: userRequest, response: Response) => {
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
}
