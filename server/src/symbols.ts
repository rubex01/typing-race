const symbols = {
    // repositories
    playerRepositoryInterface: Symbol('playerRepositoryInterface'),
    gameRepositoryInterface: Symbol('gameRepositoryInterface'),

    // controllers
    playerController: Symbol('playerController'),

    // services

    authService: Symbol('authService'),

    // other
    prismaClient: Symbol('prismaClient'),
    gameStateInterface: Symbol('gameStateInterface'),
};

export default symbols;