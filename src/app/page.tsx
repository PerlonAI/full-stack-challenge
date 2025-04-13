import { Form } from "@/components/Form";
import { getTodaysWord, getWords } from "@/lib/words";
import { Word } from "@/lib/types";

const ROWS= 6;
const COLS= 5;

export default async function Home() {
  const words = await getWords();
  if(words.isErr()){
    return <div> Error loading words </div>
  }

  const targetWord = getTodaysWord(words.value);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form targetWord={targetWord[0] as unknown as Word} ROWS={ROWS} COLS={COLS} />
    </main>
  )
}
