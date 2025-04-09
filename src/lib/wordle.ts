import type { Word, WordleStatus } from "./types";

interface CheckWordleProps {
  userInput: Word[];
  answer: Word;
}

export function checkWordle({
  userInput,
  answer 
}: CheckWordleProps): WordleStatus[] {
  const userInputWord = userInput.join("");
  const answerWord = answer;
  const result: WordleStatus[] = [];
  for (let i = 0; i < userInputWord.length; i++) {
    if (userInputWord[i] === answerWord[i]) {
      result.push("correct");
    } else if (answerWord.includes(userInputWord[i])) {
      result.push("present");
    } else {
      result.push("absent");
    }
  }
  return result;
}
