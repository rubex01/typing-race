import { Router } from 'express';
import {validation} from "@/middleware/validation";
import {authenticatePlayerSchema, storePlayerSchema} from "@/validation/player";
import { container } from 'tsyringe';
import { playerController } from "@/controllers/playerController";

const router = Router();

// Player routes
const controller = container.resolve(playerController);
router.post('/register', validation(storePlayerSchema), controller.store);
router.post('/login', validation(authenticatePlayerSchema), controller.authenticate)

export default router;
