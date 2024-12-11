const symbols = {
    // repositories
    userRepositoryInterface: Symbol('userRepositoryInterface'),
    gameRepositoryInterface: Symbol('gameRepositoryInterface'),
    playerRepositoryInterface: Symbol('playerRepositoryInterface'),
    wordRepositoryInterface: Symbol('wordRepositoryInterface'),
    resultRepositoryInterface: Symbol('resultRepositoryInterface'),

    // controllers
    userController: Symbol('userController'),

    // services
    authService: Symbol('authService'),
    socketServiceInterface: Symbol('socketServiceInterface'),
    gameRoomService: Symbol('gameRoomService'),
    gamePlayService: Symbol('gamePlayService'),
    gameStartService: Symbol('gameStartService'),
    gameRemovalService: Symbol('gameRemovalService'),
    gameWinnerService: Symbol('gameWinnerService'),
    gameResultService: Symbol('gameResultService'),

    // other
    prismaClient: Symbol('prismaClient'),
    gameStateInterface: Symbol('gameStateInterface'),
    playerStateInterface: Symbol('playerStateInterface'),
};

export default symbols;