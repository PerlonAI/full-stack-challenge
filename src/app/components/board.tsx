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

const Rows = ({ wordToGuess }: { wordToGuess: string }) => {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {Array(NUMBER_OF_ROWS)
        .fill(null)
        .map((_, r) => (
          <Row key={r} wordToGuess={wordToGuess} />
        ))}
    </div>
  );
};

const getTilesState = ({
  wordToGuess,
  guessedWord,
}: { wordToGuess: string; guessedWord: string }): TileState[] => {
  return guessedWord.split('').map((guessedLetter, index) => {
    const indexInWordToGuess = wordToGuess.indexOf(guessedLetter);
    if (indexInWordToGuess === -1) {
      return 'no match';
    }
    if (indexInWordToGuess === index) {
      return 'full match';
    }
    return 'partial match';
  });
};

const Row = ({ wordToGuess }: { wordToGuess: string }) => {
  const [guessedWord, setGuessedWord] = useState('');
  const tileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const hasEnteredWord = guessedWord.length === NUMBER_OF_COLUMNS;

  const tilesState = getTilesState({ wordToGuess, guessedWord });

  console.log(guessedWord);

  const onLetterChange = (value: string, index: number) => {
    setGuessedWord((prevState) => {
      const newState = prevState.split('');
      newState[index] = value;
      return newState.join('');
    });
    if (value.length === 1) {
      const nextInputElement = tileRefs.current[index + 1];
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

type TileState = 'unchecked' | 'partial match' | 'full match' | 'no match';

const stateToBackgroundColor: Record<TileState, string> = {
  unchecked: 'bg-transparent',
  'partial match': 'bg-[#c9b458]',
  'full match': 'bg-[#6aaa64]',
  'no match': 'bg-[#787c7e]',
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

export const Board = ({ wordToGuess }: { wordToGuess: string }) => {
  return (
    <section className="w-1/2 h-screen mx-auto flex justify-center items-center">
      <Rows wordToGuess={wordToGuess} />
    </section>
  );
};
