'use client';
import { letterSchema } from '@/app/schemas/letter';
import {
  type ForwardedRef,
  type KeyboardEvent,
  forwardRef,
  useRef,
  useState,
} from 'react';

const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 5;

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

const Row = ({
  wordToGuess,
  board,
  rowIndex,
  onUpdateRow,
}: {
  wordToGuess: string;
  board: Board;
  rowIndex: number;
  onUpdateRow: (rowIndex: number, columnIndex: number, letter: string) => void;
}) => {
  const guessedWord = board[rowIndex].map((row) => row.value).join('');
  const tileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const hasEnteredWord = guessedWord.length === NUMBER_OF_COLUMNS;

  const tilesState = getTilesState({ targetWord: wordToGuess, guessedWord });

  const onLetterChange = (value: string, columnIndex: number) => {
    onUpdateRow(rowIndex, columnIndex, value);
    if (value.length === 1) {
      const nextInputElement = tileRefs.current[columnIndex + 1];
      nextInputElement?.focus();
      nextInputElement?.setSelectionRange(1, 1);
      return;
    }
  };

  const onBackspacePress = (
    keyDown: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (keyDown.key !== 'Backspace') {
      return;
    }
    const previousInputElement = tileRefs.current[index - 1];
    previousInputElement?.focus();
    previousInputElement?.setSelectionRange(1, 1);
  };

  return Array(NUMBER_OF_COLUMNS)
    .fill(null)
    .map((_, index) => (
      <Tile
        key={index}
        ref={(el) => {
          tileRefs.current[index] = el;
        }}
        onLetterChange={onLetterChange}
        onBackspacePress={onBackspacePress}
        index={index}
        isInputEnabled={!hasEnteredWord}
        state={hasEnteredWord ? tilesState[index] : 'unchecked'}
      />
    ));
};

type TileProps = {
  index: number;
  onLetterChange(value: string, index: number): void;
  onBackspacePress(
    keyDown: KeyboardEvent<HTMLInputElement>,
    index: number,
  ): void;
  isInputEnabled: boolean;
  state: TileState;
};

type Board = {
  value: string;
  state: TileState;
}[][];

type TileState = 'unchecked' | 'present' | 'correct' | 'absent';

const stateToBackgroundColor: Record<TileState, string> = {
  unchecked: 'bg-transparent',
  present: 'bg-[#c9b458]',
  correct: 'bg-[#6aaa64]',
  absent: 'bg-[#787c7e]',
};

const Tile = forwardRef(
  (
    {
      onLetterChange,
      index,
      isInputEnabled,
      state,
      onBackspacePress,
    }: TileProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [letter, setLetter] = useState('');

    const backgroundColor = stateToBackgroundColor[state];

    return (
      <input
        ref={ref}
        className={`w-16 h-16 flex justify-center font-sans items-center border-[#3a3a3c] text-white uppercase font-extrabold text-3xl text-center border-2 ${backgroundColor}`}
        value={letter}
        type="text"
        maxLength={1}
        onKeyDown={(keyDown) => onBackspacePress(keyDown, index)}
        disabled={!isInputEnabled}
        onInput={(e) => {
          if (!letterSchema.safeParse(e.currentTarget.value).success) {
            return;
          }
          setLetter(e.currentTarget.value);
          onLetterChange(e.currentTarget.value, index);
        }}
      />
    );
  },
);

export const Board = ({ targetWord }: { targetWord: string }) => {
  const [board, setBoard] = useState<Board>(
    Array(NUMBER_OF_ROWS).fill(
      Array(NUMBER_OF_COLUMNS).fill({
        value: '',
        state: '',
      }),
    ),
  );

  console.log(JSON.stringify(board));

  const onUpdateRow = (
    rowIndex: number,
    columnIndex: number,
    letter: string,
  ) => {
    setBoard((prevState) => {
      const newBoard = prevState.map((row) => row.map((tile) => ({ ...tile })));

      newBoard[rowIndex][columnIndex].value = letter;

      return newBoard;
    });
  };

  return (
    <section className="w-1/2 h-screen mx-auto flex justify-center items-center">
      <div className="grid grid-cols-5 gap-1.5">
        {board.map((_, idx) => (
          <Row
            key={idx}
            wordToGuess={targetWord}
            board={board}
            rowIndex={idx}
            onUpdateRow={onUpdateRow}
          />
        ))}
      </div>
    </section>
  );
};
