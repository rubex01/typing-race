export interface wordRepositoryInterface {
    getRandomWords(count: number): Promise<string[]>;
}
