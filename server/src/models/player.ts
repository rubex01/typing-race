import {eventListenerInterface} from "@/contracts/eventListenerInterface";
import {checkToStartGame} from "@/listeners/checkToStartGame";
import {checkForGameWinner} from "@/listeners/checkForGameWinner";
import {checkToRemoveGame} from "@/listeners/checkToRemoveGame";
import {model} from "@/models/model";
import {User} from "@prisma/client";
import {checkToUpdateResults} from "@/listeners/checkToUpdateResults";

export class player extends model implements eventListenerInterface<player> {

    private eventListeners: Map<string, Array<(player: player) => void>> = new Map();

    private letterIndex: number = 0;

    constructor (
        private socketId: string,
        private playerId: string,
        private gameId: string,
        private user: User|null,
    ) {
        super();
        this.setupDefaultListeners();
    }

    getSocketId = () => this.socketId;

    getPlayerId = () => this.playerId;

    getGameId = () => this.gameId;

    getLetterIndex = () => this.letterIndex;

    setLetterIndex = (letterIndex: number) => {
        this.letterIndex = letterIndex;
        this.emit('letterIndexUpdated');
    }

    getUser = () => this.user;

    emit(event: string): void {
        const listeners = this.eventListeners.get(event) || [];
        listeners.forEach(listener => listener(this));
    }

    on(event: string, listener: (context: player) => void): void {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event)!.push(listener);
    }

    setupDefaultListeners(): void {
        this.on(model.EVENT_STORED, checkToStartGame);
        this.on(model.EVENT_DESTROYED, checkToRemoveGame);
        this.on('letterIndexUpdated', checkForGameWinner);
        this.on('letterIndexUpdated', checkToUpdateResults);
    }
}