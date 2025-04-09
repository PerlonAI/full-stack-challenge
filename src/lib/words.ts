import { join } from 'node:path';
import { Result, ok, err } from 'neverthrow';
import * as fs from 'node:fs';
import { Words, wordsSchema } from './types';


/**
* load words from the words.txt file
  */
export async function  getWords(): Promise<Result<Words,Error>> {
  const wordsPath = join(import.meta.dirname,'./words.json');
  const words = await fs.promises.readFile(wordsPath, 'utf-8');
  const parsedWords = JSON.parse(words);
  const result = wordsSchema.safeParse(parsedWords);
  if (!result.success) {
    return err(new Error('Invalid words file'));
  }
  return ok(result.data);
}

interface GetRandomWords {
  words: string[];
  count?: number;
}

export async function getRandomWords(opts:GetRandomWords): Promise<string[]> {
  const {
    words,
    count = 1,
  } = opts;

  const randomWords = [];
  const wordsCount = words.length;
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordsCount);
    randomWords.push(words[randomIndex]);
  }

  return randomWords;
}
