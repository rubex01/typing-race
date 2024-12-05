import {User} from "@prisma/client";

export interface storePlayerData {
    name: string
    email: string
    password: string
}

interface userPasswordHash {
    password: string,
    id: number,
}

export interface playerRepositoryInterface {
    storePlayer(playerData: storePlayerData): Promise<User>
    emailExists(email: string): Promise<boolean>
    getById(id: number): Promise<User|null>
    getPasswordHashByEmail(email: string): Promise<userPasswordHash|null>
}