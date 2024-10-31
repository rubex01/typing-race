import { WordRepository } from "../repositories/wordRepository.js";

const GameService = (io) => {
    const ioInstance = io;

    const games = [];

    const wordRepository = WordRepository();

    const playerJoinedRoom = (socket, gameId, data) => {
        const game= getOrCreateGameForRoom(gameId);
        if (game.startTime !== null && game.startTime <= new Date()) {
            return;
        }
        socket.join(gameId);
        game.players.set(socket.id, data.playerId)
        if (game.players.size > 1) {
            startGame(gameId, game);
        }
    }

    const getOrCreateGameForRoom = (room) => {
        let game = games.find(x => x.gameId === room);
        if (!game) {
            const words = wordRepository.getRandomWords(21);
            game = {
                gameId: room,
                players: new Map(),
                startTime: null,
                words,
                finalLetterIndex: words.join('').length,
                winner: null,
                destructTimer: null,
            };
            games.push(game);
        }
        return game;
    }

    const startGame = (gameId, game) => {
        game.startTime = new Date((new Date()).getTime() + 3000);
        game.destructTimer = setTimeout(() => {
            removeGame(gameId);
        }, 3000000);
        ioInstance.to(gameId).emit(gameId, {
            type: "gameStart",
            data: {
                startTime: game.startTime,
                words: game.words
            }
        });
    }

    const sendGameData = (socket, gameId, data) => {
        const game = games.find(x => x.gameId === gameId)
        if (
            game === null ||
            game?.startTime === null ||
            !game?.players.has(socket.id)
        ) {
            return;
        }
        ioInstance.to(gameId).emit(gameId, {
            type: "gameEvent",
            data,
        });
        if (data?.letterIndex >= game.finalLetterIndex && game.winner === null) {
            game.winner = socket.id;
            ioInstance.to(gameId).emit(gameId, {
                type: "gameWinner",
                data: {
                    winner: game.players.get(socket.id)
                },
            });
        }
    }

    const playerDisconnected = (socket, gameId) => {
        const game = games.find(x => x.gameId === gameId);
        if (!game) return;
        game.players.delete(socket.id);
        if (game.players.size === 0) {
            removeGame(gameId);
        }
    };

    const removeGame = (gameId) => {
        const index = games.findIndex(x => x.gameId === gameId);
        if (index === -1) {
            return;
        }
        clearTimeout(games[index].destructTimer);
        games.splice(index, 1);
    };

    return {
        playerJoinedRoom, sendGameData, playerDisconnected
    };
};

export default GameService;