import {playerRepositoryInterface, storePlayerData} from '../contracts/playerRepositoryInterface'
import {PrismaClient} from '@prisma/client'
import {inject, injectable} from "tsyringe";
import types from '@/types'
import {hashPassword} from "@/helpers/hashPassword";

@injectable()
export class playerRepository implements playerRepositoryInterface {
    constructor(
        @inject(types.prismaClient) private readonly prisma: PrismaClient,
    ) {}

    storePlayer =  async (data: storePlayerData) => {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: await hashPassword(data.password)
            }
        });
    }

    getById = async (id: number) => {
        return this.prisma.user.findUnique({
            where: {id},
        });
    }

    emailExists = async (email: string) => {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        return user !== null;
    }

    getPasswordHashByEmail = async (email: string) => {
        return this.prisma.user.findUnique({
            where: {email},
            select: {
                password: true,
                id: true,
            }
        })
    }
}
