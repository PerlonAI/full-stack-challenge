import { Board } from '@/app/components/Board';
import { getWordToGuess } from '@/app/utils/getWordToGuess';

async function getWords<T>() {
  const res = await fetch('http://localhost:3000/api/words');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return (await res.json()) as T;
}

export default async function Home() {
  const words = await getWords<string[]>();

  const wordToGuess = getWordToGuess(words);

  return (
    <main className="w-full h-screen bg-[#121213]">
      <Board targetWord={wordToGuess} />
    </main>
  );
}
