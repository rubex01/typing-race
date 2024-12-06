import { Router } from 'express';
import {validation} from "@/middleware/validation";
import {authenticatePlayerSchema, storePlayerSchema} from "@/validation/player";
import { container } from 'tsyringe';
import { playerController } from "@/controllers/playerController";
import {authorize} from "@/middleware/authorization";

const router = Router();

// Player routes
const controller = container.resolve(playerController);
router.post('/register', validation(storePlayerSchema), controller.store);
router.post('/login', validation(authenticatePlayerSchema), controller.authenticate);
router.get('/me', authorize, controller.me);
router.get('/test', authorize, controller.test);

export default router;
