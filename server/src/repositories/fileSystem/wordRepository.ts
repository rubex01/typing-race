import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const WordRepository = () => {
    let words: string[] = [];

    const loadWords = (): void => {
        try {
            const data = fs.readFileSync(path.join(__dirname, '../../storage', 'words_2.txt'), 'utf-8');
            words = data.split(/\r?\n/);  // Split the file contents by newline
        } catch (error) {
            console.error('Error reading words file:', error);
        }
    };
    loadWords();

    const getRandomWords = (count: number): string[] => {
        const randomWords: string[] = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            randomWords.push(words[randomIndex]);
        }
        return randomWords;
    };

    return {
        getRandomWords
    };
};
