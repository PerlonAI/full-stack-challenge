import * as v from "valibot";
import type { UserInput, Word, WordleStatusArray } from "./types";
import { wordleStatusSchemaArray } from "./types";

interface CheckWordleProps {
	userInput: UserInput;
	answer: Word;
}

export function checkWordle({
	userInput,
	answer,
}: CheckWordleProps): WordleStatusArray {
	const userInputWord = userInput;
	const answerWord = answer;
	const result = [];

	for (let i = 0; i < userInputWord.length; i++) {
		const row = [];
		for (let j = 0; j < userInputWord[i].length; j++) {
			const letter = userInputWord[i][j];
			if (letter === "") {
				row.push("");
			} else if (letter === answerWord[j]) {
				row.push("correct");
			} else if (answerWord.includes(letter)) {
				row.push("present");
			} else {
				row.push("absent");
			}
		}
		result.push(row);
	}
	const parsedResult = v.safeParse(wordleStatusSchemaArray, result);
	if (!parsedResult.success) {
		throw new Error("Invalid result");
	}
	return parsedResult.output;
}
