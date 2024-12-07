import {User} from "@prisma/client";

export interface storeUserData {
    name: string
    email: string
    password: string
}

interface userPasswordHash {
    password: string,
    id: number,
}

export interface userRepositoryInterface {
    storePlayer(playerData: storeUserData): Promise<User>
    emailExists(email: string): Promise<boolean>
    getById(id: number): Promise<User|null>
    getPasswordHashByEmail(email: string): Promise<userPasswordHash|null>
}