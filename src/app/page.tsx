import { Form } from "@/components/Form";
import type { Word } from "@/lib/types";
import { getTodaysWord, getWords } from "@/lib/words";

const ROWS = 6;
const COLS = 5;

export default async function Home() {
	const words = await getWords();
	if (words.isErr()) {
		return <div> Error loading words </div>;
	}

	const targetWord = getTodaysWord(words.value);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Form targetWord={targetWord} ROWS={ROWS} COLS={COLS} />
		</main>
	);
}
