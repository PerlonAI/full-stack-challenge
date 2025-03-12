
import {Board} from '@/app/components/board';
import {getWordToGuess} from '@/app/utils/getWordToGuess';

async function getWords<T>() {
  const res = await fetch('http://localhost:3000/api/words')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return await res.json() as T;
}

export default async function Home() {
  const { words } = await getWords<{words: string[]}>();

  console.log('words', words);

  const wordToGuess = getWordToGuess(words);

  console.log('word to guess',  wordToGuess);

  return <main className="w-full">
    <Board wordToGuess={wordToGuess} />
  </main>;
}
