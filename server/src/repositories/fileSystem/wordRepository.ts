import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { wordRepositoryInterface } from '@/repositories/contracts/wordRepositoryInterface';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class wordRepository implements wordRepositoryInterface {
    private words: string[] = [];

    constructor() {
        this.loadWords();
    }

    private loadWords = (): void => {
        try {
            const data = fs.readFileSync(path.join(__dirname, '../../storage', 'words_2.txt'), 'utf-8');
            this.words = data.split(/\r?\n/);
        } catch (error) {
            console.error('Error reading words file:', error);
        }
    };

    getRandomWords = (count: number): Promise<string[]> => {
        const randomWords: string[] = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * this.words.length);
            randomWords.push(this.words[randomIndex]);
        }
        return Promise.resolve(randomWords);
    };
}