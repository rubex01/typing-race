import { WordRepository } from "@/repositories/fileSystem/wordRepository";
import { Server, Socket } from "socket.io";
import { ioServer } from '@/server'

interface Game {
    gameId: string;
    players: Map<string, string>;
    startTime: Date | null;
    words: string[];
    finalLetterIndex: number;
    winner: string | null;
    destructTimer: NodeJS.Timeout | null;
}

interface GameEventData {
    letterIndex: number;
}

export class gameService {
    ioInstance: Server = ioServer;
    games: Game[] = [];
    wordRepository = WordRepository();

    playerJoinedRoom = (socket: Socket, gameId: string, data: { playerId: string }): void => {
        const game = this.getOrCreateGameForRoom(gameId);
        if (game.startTime !== null && game.startTime <= new Date()) {
            return;
        }
        socket.join(gameId);
        game.players.set(socket.id, data.playerId);
        if (game.players.size > 1) {
            this.startGame(gameId, game);
        }
    };

    getOrCreateGameForRoom = (room: string): Game => {
        let game = this.games.find(x => x.gameId === room);
        if (!game) {
            const words = this.wordRepository.getRandomWords(21);
            game = {
                gameId: room,
                players: new Map(),
                startTime: null,
                words,
                finalLetterIndex: words.join('').length,
                winner: null,
                destructTimer: null,
            };
            this.games.push(game);
        }
        return game;
    };

    startGame = (gameId: string, game: Game): void => {
        game.startTime = new Date((new Date()).getTime() + 3000);
        game.destructTimer = setTimeout(() => {
            this.removeGame(gameId);
        }, 3000000);

        this.ioInstance.to(gameId).emit(gameId, {
            type: "gameStart",
            data: {
                startTime: game.startTime,
                words: game.words
            }
        });
    };

    sendGameData = (socket: Socket, gameId: string, data: GameEventData): void => {
        const game = this.games.find(x => x.gameId === gameId);
        if (
            game === null ||
            game?.startTime === null ||
            !game?.players.has(socket.id)
        ) {
            return;
        }

        this.ioInstance.to(gameId).emit(gameId, {
            type: "gameEvent",
            data,
        });

        if (data?.letterIndex >= game.finalLetterIndex && game.winner === null) {
            game.winner = socket.id;
            this.ioInstance.to(gameId).emit(gameId, {
                type: "gameWinner",
                data: {
                    winner: game.players.get(socket.id)
                },
            });
        }
    };

    playerDisconnected = (socket: Socket, gameId: string): void => {
        const game = this.games.find(x => x.gameId === gameId);
        if (!game) return;
        game.players.delete(socket.id);
        if (game.players.size === 0) {
            this.removeGame(gameId);
        }
    };

    removeGame = (gameId: string): void => {
        const index = this.games.findIndex(x => x.gameId === gameId);
        if (index === -1) {
            return;
        }
        clearTimeout(this.games[index].destructTimer!);
        this.games.splice(index, 1);
    };
}

//
//
// export const GameService = (io: Server): GameService => {
//     const ioInstance = io;
//
//     const games: Game[] = [];
//
//     const wordRepository = WordRepository();
//
//     const playerJoinedRoom = (socket: Socket, gameId: string, data: { playerId: string }): void => {
//         const game = getOrCreateGameForRoom(gameId);
//         if (game.startTime !== null && game.startTime <= new Date()) {
//             return;
//         }
//         socket.join(gameId);
//         game.players.set(socket.id, data.playerId);
//         if (game.players.size > 1) {
//             startGame(gameId, game);
//         }
//     };
//
//     const getOrCreateGameForRoom = (room: string): Game => {
//         let game = games.find(x => x.gameId === room);
//         if (!game) {
//             const words = wordRepository.getRandomWords(21);
//             game = {
//                 gameId: room,
//                 players: new Map(),
//                 startTime: null,
//                 words,
//                 finalLetterIndex: words.join('').length,
//                 winner: null,
//                 destructTimer: null,
//             };
//             games.push(game);
//         }
//         return game;
//     };
//
//     const startGame = (gameId: string, game: Game): void => {
//         game.startTime = new Date((new Date()).getTime() + 3000);
//         game.destructTimer = setTimeout(() => {
//             removeGame(gameId);
//         }, 3000000);
//
//         ioInstance.to(gameId).emit(gameId, {
//             type: "gameStart",
//             data: {
//                 startTime: game.startTime,
//                 words: game.words
//             }
//         });
//     };
//
//     const sendGameData = (socket: Socket, gameId: string, data: GameEventData): void => {
//         const game = games.find(x => x.gameId === gameId);
//         if (
//             game === null ||
//             game?.startTime === null ||
//             !game?.players.has(socket.id)
//         ) {
//             return;
//         }
//
//         ioInstance.to(gameId).emit(gameId, {
//             type: "gameEvent",
//             data,
//         });
//
//         if (data?.letterIndex >= game.finalLetterIndex && game.winner === null) {
//             game.winner = socket.id;
//             ioInstance.to(gameId).emit(gameId, {
//                 type: "gameWinner",
//                 data: {
//                     winner: game.players.get(socket.id)
//                 },
//             });
//         }
//     };
//
//     const playerDisconnected = (socket: Socket, gameId: string): void => {
//         const game = games.find(x => x.gameId === gameId);
//         if (!game) return;
//         game.players.delete(socket.id);
//         if (game.players.size === 0) {
//             removeGame(gameId);
//         }
//     };
//
//     const removeGame = (gameId: string): void => {
//         const index = games.findIndex(x => x.gameId === gameId);
//         if (index === -1) {
//             return;
//         }
//         clearTimeout(games[index].destructTimer!);
//         games.splice(index, 1);
//     };
//
//     return {
//         playerJoinedRoom,
//         sendGameData,
//         playerDisconnected
//     };
// };
