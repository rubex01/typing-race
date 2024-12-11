import { Router } from 'express';
import {validation} from "@/middleware/validation";
import {authenticatePlayerSchema, storePlayerSchema} from "@/validation/player";
import { container } from 'tsyringe';
import { userController } from "@/controllers/userController";
import {authorize} from "@/middleware/authorization";
import {resultController} from "@/controllers/resultController";

const router = Router();

// Player routes
const userc = container.resolve(userController);
router.post('/register', validation(storePlayerSchema), userc.store);
router.post('/login', validation(authenticatePlayerSchema), userc.authenticate);
router.get('/me', authorize, userc.me);

const resultc = container.resolve(resultController);
router.get('/results/average', authorize, resultc.average);


export default router;
