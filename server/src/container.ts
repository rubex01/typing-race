import "reflect-metadata";
import {container} from "tsyringe";
import {playerController} from "./controllers/playerController";
import {playerRepositoryInterface} from "./repositories/contracts/playerRepositoryInterface";
import {playerRepository} from './repositories/postgreSQL/playerRepository'
import types from "@/types";
import {prisma} from "@/clients/prismaClient";
import { PrismaClient } from "@prisma/client";
import {authService} from "@/services/authService";

// Controllers
container.register<playerController>(types.playerController, playerController);

// Repositories
container.registerSingleton<playerRepositoryInterface>(types.playerRepositoryInterface, playerRepository);

// Services
container.registerSingleton<authService>(types.authService, authService);

// Other
container.registerInstance<PrismaClient>(types.prismaClient, prisma);

export default container;
