import { z } from "zod"
import container from "@/container";
import symbols from "@/symbols";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";

export const storePlayerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address').refine(async email => {
        const playerRepository = container.resolve<playerRepositoryInterface>(symbols.playerRepositoryInterface);
        return !await playerRepository.emailExists(email);
    }, {message: 'Account with this email already exists'}),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const authenticatePlayerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string(),
})