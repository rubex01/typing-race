import {beforeEach, expect} from "vitest";
import {userController} from "@/controllers/userController";
import container from "@/container";
import { Request, Response } from 'express';
import {userRepositoryInterface} from "@/repositories/contracts/userRepositoryInterface";
import symbols from "@/symbols";

describe('Logging in', () => {
    let controller: userController;
    let repository: userRepositoryInterface;

    beforeEach(async () => {
        controller = container.resolve(userController);
        repository = container.resolve<userRepositoryInterface>(symbols.userRepositoryInterface);
    });

    it('logs in when account exists and password is right', async () => {
        await repository.store({
            name: 'Test User',
            email: 'test123@example.com',
            password: 'plaintextpassword123',
        })

        const mockRequest: Partial<Request> = {
            body: {
                email: 'test123@example.com',
                password: 'plaintextpassword123',
            },
        };

        const mockResponse: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await controller.authenticate(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                token: expect.any(String),
            })
        );
    });

    it('does not log in when user does not exist', async () => {
        const mockRequest: Partial<Request> = {
            body: {
                email: 'test123@examplasdsafdsafae.com',
                password: 'plaintextpassworsdafasdfasdfd123',
            },
        };

        const mockResponse: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await controller.authenticate(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Authentication failed',
            })
        );
    });

    it('does not log in when password is wrong', async () => {
        await repository.store({
            name: 'Test User',
            email: 'test12aa3@example.com',
            password: 'plaintextpassword123',
        })

        const mockRequest: Partial<Request> = {
            body: {
                email: 'test12aa3@example.com',
                password: 'asddasdasdsfaasd',
            },
        };

        const mockResponse: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await controller.authenticate(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Authentication failed',
            })
        );
    });
});