export interface eventListenerInterface <T> {
    on(event: string, listener: (context: T) => void): void;
    emit(event: string): void;
    setupDefaultListeners(): void;
}