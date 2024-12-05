import {inject, injectable} from "tsyringe";
import types from "@/types";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {comparePassword} from "@/helpers/comparePassword";
import {User} from "@prisma/client";
import {generateJWT} from "@/helpers/jwt";


@injectable()
export class authService {

    constructor(
        @inject(types.playerRepositoryInterface) private playerRepository: playerRepositoryInterface
    ) {}

    authenticate = async (email: string, password: string) => {
        const user = await this.playerRepository.getPasswordHashByEmail(email)
        if (null === user) {
            return null;
        }

        const success = await comparePassword(password, user.password);
        if (success) {
            return user.id;
        }

        return null;
    }

    createJWTForUserId = async (userId: number) => {
        const user = await this.playerRepository.getById(userId);
        if (!user) {
            return null;
        }

        return generateJWT({ id: user.id, email: user.email });
    }
}