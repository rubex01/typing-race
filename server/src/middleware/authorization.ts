import { Request, Response, NextFunction } from "express";
import {container} from "tsyringe";
import {authService} from "@/services/authService";

export const authorize = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        response.status(401).json({ message: "Token is required" });
        return;
    }
    const token = authHeader.split(" ")[1];

    const service = container.resolve(authService);
    try {
        const user = await service.authorize(token);
        if (!user) {
            response.status(401).json({ message: "Authentication failed" });
            return;
        }

        request.user = user;
        next();
    } catch {
        response.status(401).json({ message: "Authentication failed" });
    }
};