import {join} from 'node:path';
import {Result,ok,err} from 'neverthrow';
import {z } from 'zod';
import * as fs from 'node:fs';
import 'server-only';

const wordsSchema = z.array(z.string());

/**
* load words from the words.txt file
  */
export function getWords(): Result<string[], Error> {
  const wordsPath = join(import.meta.dirname,'./words.json');
  const words = fs.readFileSync(wordsPath, 'utf-8');
  const parsedWords = JSON.parse(words);
  const result = wordsSchema.safeParse(parsedWords);
  if (!result.success) {
    return err(new Error('Invalid words file'));
  }
  return ok(result.data);
}
