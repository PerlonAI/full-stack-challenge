import type { Word, WordleStatusArray } from "./types";
import { wordleStatusSchemaArray } from "./types";
import * as v from "valibot";

interface CheckWordleProps {
  userInput: Word;
  answer: Word;
}

export function checkWordle({
  userInput,
  answer 
}: CheckWordleProps): WordleStatusArray{
  const userInputWord = userInput;
  const answerWord = answer;
  const result=[]
  for (let i = 0; i < userInputWord.length; i++) {
    if (userInputWord[i] === answerWord[i]) {
      result.push("correct");
    } else if (answerWord.includes(userInputWord[i])) {
      result.push("present");
    } else {
      result.push("absent");
    }
  }
  return v.parse(wordleStatusSchemaArray, result);
}
