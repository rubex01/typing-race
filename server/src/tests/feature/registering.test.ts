import {beforeEach, expect} from "vitest";
import {userController} from "@/controllers/userController";
import container from "@/container";
import { Request, Response } from 'express';

describe('Registering a new account', () => {
    let controller: userController;

    beforeEach(async () => {
        controller = container.resolve(userController);
    });

    it('registers a new account', async () => {
        const mockRequest: Partial<Request> = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'plaintextpassword123',
            },
        };

        const mockResponse: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };

        await controller.store(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Test User',
                email: 'test@example.com',
            })
        );
    });
});