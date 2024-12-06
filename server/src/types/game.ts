export type Game = {
    gameId: string;
    players: Map<string, string>;
    startTime: Date | null;
    words: string[];
    finalLetterIndex: number;
    winner: string | null;
    destructTimer: NodeJS.Timeout | null;
}
