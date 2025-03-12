import { Board } from '@/app/components/Board';
import { wordResponseSchema } from '@/app/schemas/word';
import { getTargetWord } from '@/app/utils/getTargetWord';
import { env } from '@/app/environment/server';

async function getWords() {
  const res = await fetch(env.WORDS_API_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return wordResponseSchema.parse(data);
}

export default async function Home() {
  const words = await getWords();

  const targetWord = getTargetWord(words);

  return (
    <main className="w-full h-screen bg-[#121213]">
      <Board targetWord={targetWord} />
    </main>
  );
}
