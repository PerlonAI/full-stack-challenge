'use client';

import { Row } from '@/app/components/Row';
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from '@/app/constants/board';
import type { BoardState, TileState } from '@/app/types/board';
import { useState } from 'react';

const getTilesState = ({
  targetWord,
  guessedWord,
}: { targetWord: string; guessedWord: string }): TileState[] => {
  const target = targetWord.toLowerCase();
  const guess = guessedWord.toLowerCase();

  const letterFrequency: Record<string, number> = {};

  for (const letter of target) {
    letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
  }

  const result: TileState[] = Array(guess.length).fill('absent');

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result[i] = 'correct';
      letterFrequency[guess[i]]--;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue;

    if (letterFrequency[guess[i]] > 0) {
      result[i] = 'present';
      letterFrequency[guess[i]]--;
    }
  }

  return result;
};

const getIsRowEnabled = (board: BoardState, rowIndex: number, targetWord: string) => {
  if (rowIndex === 0) {
    return true;
  }

  const previousRowWord = board[rowIndex - 1].map(({ value }) => value.toLowerCase()).join('');

  return previousRowWord.length === 5 && previousRowWord !== targetWord.toLowerCase();
};

export const Board = ({ targetWord }: { targetWord: string }) => {
  const [board, setBoard] = useState<BoardState>(
    Array(NUMBER_OF_ROWS).fill(
      Array(NUMBER_OF_COLUMNS).fill({
        value: '',
        state: 'unchecked',
      }),
    ),
  );

  const onUpdateLetter = (
    rowIndex: number,
    columnIndex: number,
    letter: string,
  ) => {
    setBoard((prevState) => {
      const newBoard = prevState.map((row) => row.map((tile) => ({ ...tile })));

      newBoard[rowIndex][columnIndex].value = letter;

      const guessedWord = newBoard[rowIndex].map((row) => row.value).join('');

      if (guessedWord.length !== 5) {
        return newBoard;
      }

      const tilesState = getTilesState({ targetWord, guessedWord });

      newBoard[rowIndex] = newBoard[rowIndex].map((tile, index) => ({
        ...tile,
        state: tilesState[index],
      }));

      return newBoard;
    });
  };

  return (
    <section className="w-1/2 h-screen mx-auto flex justify-center items-center">
      <div className="grid grid-cols-5 gap-1.5">
        {board.map((rowData, idx) => (
          <Row
            key={idx}
            wordToGuess={targetWord}
            rowData={rowData}
            rowIndex={idx}
            isRowEnabled={getIsRowEnabled(board, idx, targetWord)}
            onUpdateRow={onUpdateLetter}
          />
        ))}
      </div>
    </section>
  );
};
