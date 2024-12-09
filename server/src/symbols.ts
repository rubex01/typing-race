
const symbols = {
    // repositories
    userRepositoryInterface: Symbol('userRepositoryInterface'),
    gameRepositoryInterface: Symbol('gameRepositoryInterface'),
    playerRepositoryInterface: Symbol('playerRepositoryInterface'),
    wordRepositoryInterface: Symbol('wordRepositoryInterface'),

    // controllers
    userController: Symbol('userController'),

    // services
    authService: Symbol('authService'),
    socketService: Symbol('socketService'),
    gameRoomService: Symbol('gameRoomService'),
    gamePlayService: Symbol('gamePlayService'),
    gameStartService: Symbol('gameStartService'),
    gameRemovalService: Symbol('gameRemovalService'),

    // other
    prismaClient: Symbol('prismaClient'),
    gameStateInterface: Symbol('gameStateInterface'),
    playerStateInterface: Symbol('playerStateInterface'),
};

export default symbols;