import { Request, Response, NextFunction } from "express";
import {User} from "@prisma/client";
import {container} from "tsyringe";
import {authService} from "@/services/authService";

export interface AuthRequest extends Request {
    user: User
}

const authenticationFailed = (response: Response) => {
    return response.status(401).json({ message: "You are not authorized" });
};

export const authorize = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return authenticationFailed(response);
    }
    const token = authHeader.split(" ")[1];

    const service = container.resolve(authService);
    try {
        const user = await service.authorize(token)
        if (!user) {
            return authenticationFailed(response);
        }

        (request as AuthRequest).user = user;
        next()
    } catch {
        return authenticationFailed(response);
    }
};
