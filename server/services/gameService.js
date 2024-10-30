const GameService = (io) => {
    const ioInstance = io;

    const games = []

    const playerJoinedRoom = (socket, gameId) => {
        const game = getOrCreateGameForRoom(gameId);
        if (game.startTime !== null && game.startTime <= new Date()) {
            return;
        }
        socket.join(gameId);
        game.players.push(socket.id)
        if (game.players.length > 1) {
            startGame(gameId, game);
        }
        socket.on('disconnect', () => {
            handlePlayerDisconnect(socket, gameId);
        });
    }

    const getOrCreateGameForRoom = (room) => {
        let game = games.find(x => x.gameId === room);
        if (!game) {
            game = {
                gameId: room,
                players: [],
                finishedPlayers: [],
                startTime: null,
                words: [
                    'Iedereen', 'is', 'aan', 'het', 'slapen,', 'maar', 'Pim', 'staat', 'buiten.',
                    'Wat', 'is', 'het', 'koud!', 'En', 'wat', 'is', 'het', 'spannend.', 'Pim',
                    'heeft', 'van', 'te', 'voren', 'goed', 'opgelet', 'en', 'bekeken', 'hoe',
                    'hij', 'moet', 'lopen.', 'Hij', 'heeft', 'zelfs', 'een', 'plattegrondje', 'meegenomen.'
                ],
            };
            games.push(game);
        }
        return game;
    }

    const startGame = (gameId, game) => {
        game.startTime = new Date((new Date()).getTime() + 3000);
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
            !game.players.some(x => x === socket.id)
        ) {
            return;
        }
        ioInstance.to(gameId).emit(gameId, {
            type: "gameEvent",
            data,
        });
    }

    const handlePlayerDisconnect = (socket, gameId) => {
        const game = games.find(x => x.gameId === gameId);
        if (!game) return;

        game.players = game.players.filter(playerId => playerId !== socket.id);
        if (game.players.length < 2) {
            removeGame(gameId);
        }
    };

    const removeGame = (gameId) => {
        const index = games.findIndex(x => x.gameId === gameId);
        if (index === -1) {
            return;
        }
        games.splice(index, 1);
    };

    return {
        playerJoinedRoom, sendGameData
    };
};

export default GameService;