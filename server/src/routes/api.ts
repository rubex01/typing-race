import { Router } from 'express';
import {validation} from "@/middleware/validation";
import {authenticatePlayerSchema, storePlayerSchema} from "@/validation/player";
import { container } from 'tsyringe';
import { userController } from "@/controllers/userController";
import {authorize} from "@/middleware/authorization";

const router = Router();

// Player routes
const controller = container.resolve(userController);
router.post('/register', validation(storePlayerSchema), controller.store);
router.post('/login', validation(authenticatePlayerSchema), controller.authenticate);
router.get('/me', authorize, controller.me);

export default router;
