import { Tile } from '@/app/components/Tile';
import { NUMBER_OF_COLUMNS } from '@/app/constants/board';
import type { BoardState } from '@/app/types/board';
import { type KeyboardEvent, useRef } from 'react';

export const Row = ({
  rowData,
  rowIndex,
  onUpdateRow,
  isRowEnabled,
}: {
  wordToGuess: string;
  rowData: BoardState[number];
  rowIndex: number;
  isRowEnabled: boolean;
  onUpdateRow: (rowIndex: number, columnIndex: number, letter: string) => void;
}) => {
  const guessedWord = rowData.map((row) => row.value).join('');

  const tileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const hasEnteredWord = guessedWord.length === NUMBER_OF_COLUMNS;

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
    console.log('fireddd');
    if (keyDown.key !== 'Backspace') {
      return;
    }
    const previousInputElement = tileRefs.current[index - 1];

    if (tileRefs.current[index]?.value !== '') {
      onUpdateRow(rowIndex, index, '');
    }

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
        tile={rowData[index]}
        onLetterChange={onLetterChange}
        onBackspacePress={onBackspacePress}
        index={index}
        isInputEnabled={!hasEnteredWord && isRowEnabled}
      />
    ));
};
