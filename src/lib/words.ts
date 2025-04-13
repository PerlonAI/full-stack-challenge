import { join } from 'node:path';
import { Result, ok, err } from 'neverthrow';
import * as fs from 'node:fs';
import { Word, wordSchema, WordsFile, wordsFileSchema  } from './types';
import * as v from 'valibot';


/**
* load words from the words.txt file
  */
export async function  getWords(): Promise<Result<WordsFile, Error>> {
  const wordsPath = join('./words.json');
  const words = await fs.promises.readFile(wordsPath, 'utf-8');
  const parsedWords = JSON.parse(words);
  const result = v.safeParse(wordsFileSchema, parsedWords);
  if (!result.success) {
    return err(new Error('Invalid words file'));
  }
  return ok(result.output);
}


/**
* get today's word
*/
export function getTodaysWord(words: string[]): string {
  const today = new Date();
  const date = today.getDate() - 1;
  const todaysIndex = date % words.length;

  return words[todaysIndex]
}
