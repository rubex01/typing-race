import "reflect-metadata";
import {container} from "tsyringe";
import {playerController} from "./controllers/playerController";
import {playerRepositoryInterface} from "./repositories/contracts/playerRepositoryInterface";
import {playerRepository} from './repositories/postgreSQL/playerRepository'
import symbols from "@/symbols";
import {prisma, prismaType} from "@/clients/prismaClient";
import {authService} from "@/services/authService";
import {gameState} from "@/states/gameState";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {gameRepository} from "@/repositories/state/gameRepository";
import {gameStateInterface} from "@/states/contracts/gameStateInterface";

// Controllers
container.register<playerController>(symbols.playerController, playerController);

// Repositories
container.registerSingleton<playerRepositoryInterface>(symbols.playerRepositoryInterface, playerRepository);
container.registerSingleton<gameRepositoryInterface>(symbols.gameRepositoryInterface, gameRepository);

// Services
container.registerSingleton<authService>(symbols.authService, authService);

// Other
container.registerInstance<prismaType>(symbols.prismaClient, prisma);
container.registerSingleton<gameStateInterface>(symbols.gameStateInterface, gameState);

export default container;
