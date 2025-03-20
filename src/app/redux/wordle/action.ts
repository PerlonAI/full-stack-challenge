import { WordleAction } from "./types";

export const setLetter = (row: number, col: number, letter: string): WordleAction => ({
  type: "SET_LETTER",
  row,
  col,
  letter
});

export const submitGuess = (): WordleAction => ({
  type: "SUBMIT_GUESS"
});

export const resetGame = (): WordleAction => ({
  type: "RESET_GAME"
});