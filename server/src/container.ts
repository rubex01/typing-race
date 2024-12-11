import "reflect-metadata";
import {container} from "tsyringe";
import {userController} from "./controllers/userController";
import {userRepositoryInterface} from "./repositories/contracts/userRepositoryInterface";
import {userRepository} from './repositories/postgreSQL/userRepository'
import symbols from "@/symbols";
import {prisma, prismaType} from "@/clients/prismaClient";
import {authService} from "@/services/authService";
import {gameState} from "@/states/gameState";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {gameRepository} from "@/repositories/state/gameRepository";
import {gameStateInterface} from "@/states/contracts/gameStateInterface";
import {socketService} from "@/services/socketService";
import {gameRoomService} from "@/services/gameRoomService";
import {gamePlayService} from "@/services/gamePlayService";
import {playerStateInterface} from "@/states/contracts/playerStateInterface";
import {playerState} from "@/states/playerState";
import {playerRepository} from "@/repositories/state/playerRepository";
import {playerRepositoryInterface} from "@/repositories/contracts/playerRepositoryInterface";
import {gameStartService} from "@/services/gameStartService";
import {gameRemovalService} from "@/services/gameRemovalService";
import {wordRepositoryInterface} from "@/repositories/contracts/wordRepositoryInterface";
import {wordRepository} from "@/repositories/fileSystem/wordRepository";
import {gameWinnerService} from "@/services/gameWinnerService";
import {socketServiceInterface} from "@/services/contracts/socketServiceInterface";
import {gameResultService} from "@/services/gameResultService";
import { resultRepositoryInterface } from "./repositories/contracts/resultRepositoryInterface";
import {resultRepository} from "@/repositories/postgreSQL/resultRepository";

// Controllers
container.registerSingleton<userController>(symbols.userController, userController);

// Repositories
container.registerSingleton<userRepositoryInterface>(symbols.userRepositoryInterface, userRepository);
container.registerSingleton<gameRepositoryInterface>(symbols.gameRepositoryInterface, gameRepository);
container.registerSingleton<playerRepositoryInterface>(symbols.playerRepositoryInterface, playerRepository);
container.registerSingleton<wordRepositoryInterface>(symbols.wordRepositoryInterface, wordRepository);
container.registerSingleton<resultRepositoryInterface>(symbols.resultRepositoryInterface, resultRepository);

// Services
container.registerSingleton<authService>(symbols.authService, authService);
container.registerSingleton<socketServiceInterface>(symbols.socketServiceInterface, socketService);
container.registerSingleton<gameRoomService>(symbols.gameRoomService, gameRoomService);
container.registerSingleton<gamePlayService>(symbols.gamePlayService, gamePlayService);
container.registerSingleton<gameStartService>(symbols.gameStartService, gameStartService);
container.registerSingleton<gameRemovalService>(symbols.gameRemovalService, gameRemovalService);
container.registerSingleton<gameWinnerService>(symbols.gameWinnerService, gameWinnerService);
container.registerSingleton<gameResultService>(symbols.gameResultService, gameResultService);

// Other
container.registerInstance<prismaType>(symbols.prismaClient, prisma);
container.registerSingleton<gameStateInterface>(symbols.gameStateInterface, gameState);
container.registerSingleton<playerStateInterface>(symbols.playerStateInterface, playerState);

export default container;
