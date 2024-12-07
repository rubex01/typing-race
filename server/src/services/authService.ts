import {inject, injectable} from "tsyringe";
import symbols from "@/symbols";
import {userRepositoryInterface} from "@/repositories/contracts/userRepositoryInterface";
import {comparePassword} from "@/helpers/comparePassword";
import {User} from "@prisma/client";
import {generateJWT, verifyJWT} from "@/helpers/jwt";
import {userRequest} from "@/middleware/authorization";


@injectable()
export class authService {

    constructor(
        @inject(symbols.userRepositoryInterface) private playerRepository: userRepositoryInterface
    ) {}

    authenticate = async (email: string, password: string) => {
        const user = await this.playerRepository.getPasswordHashByEmail(email)
        if (null === user) {
            return null;
        }

        const success = await comparePassword(password, user.password);
        if (success) {
            return this.createJWTForUserId(user.id);
        }

        return null;
    }

    authorize = (token: string) => {
        const decodedData = verifyJWT(token);
        if (!decodedData?.id) {
            throw new Error('Token invalid');
        }

        return this.playerRepository.getById(decodedData.id);
    }

    createJWTForUserId = async (userId: number) => {
        return generateJWT({ id: userId });
    }
}