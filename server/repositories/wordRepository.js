import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const WordRepository = () => {

  let words = [];

  const loadWords = () => {
    try {
      const data = fs.readFileSync(path.join(__dirname, '../storage', 'words_2.txt'), 'utf-8');
      words = data.split(/\r?\n/);
    } catch (error) {
      console.error('Error reading words file:', error);
    }
  };

  loadWords();

  const getRandomWords = (count) => {
    const randomWords = [];
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
