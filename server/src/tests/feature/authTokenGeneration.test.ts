import {beforeEach, expect} from "vitest";
import {authService} from "@/services/authService";
import container from "@/container";
import {verifyJWT} from "@/helpers/jwt";
import symbols from "@/symbols";
import {userRepositoryInterface} from "@/repositories/contracts/userRepositoryInterface";
import { v4 as uuidv4 } from 'uuid'

describe('auth token generation', () => {
    let service: authService;

    beforeEach(async () => {
        service = container.resolve(authService);
    });

    it('generates an auth token', async () => {
        const userId = 98324;
        const token = await service.createJWTForUserId(userId)
        const decoded = verifyJWT(token);
        expect(decoded?.id).toBe(userId);
    });

    it('generates an auth token that can be authorized to a user', async () => {
        const userRepository = container.resolve<userRepositoryInterface>(symbols.userRepositoryInterface);
        const user = await userRepository.store({
            email: uuidv4() + '@example.com',
            password: 'password',
            name: 'randomadafn'
        })

        const token = await service.createJWTForUserId(user.id);
        const authorizedUser = await service.authorize(token);
        expect(authorizedUser).toEqual(user);
    });

    it('throws an error when token is invalid', async () => {
        const token = 'invalid';
        expect(() => service.authorize(token)).toThrowError('Token invalid');
    });

    it('throws an error when token is missing', async () => {
        const token = '';
        expect(() => service.authorize(token)).toThrowError('Token invalid');
    });

    it('can create a token by authenticating a user', async () => {
        const userRepository = container.resolve<userRepositoryInterface>(symbols.userRepositoryInterface);
        const user = await userRepository.store({
            email: uuidv4() + '@example.com',
            password: 'password',
            name: 'randomadafn'
        })

        const token = await service.authenticate(user.email, 'password');
        const authorizedUser = await service.authorize(token ?? '');
        expect(authorizedUser).toEqual(user);
    });

    it('returns null when user is not found', async () => {
        const token = await service.authenticate('', '');
        expect(token).toBeNull();
    });
});