import { letterSchema } from '@/app/schemas/letter';
import type { BoardState, TileState } from '@/app/types/board';
import { type ForwardedRef, type KeyboardEvent, forwardRef } from 'react';

const stateToBackgroundColor: Record<TileState, string> = {
  unchecked: 'bg-transparent',
  present: 'bg-[#c9b458]',
  correct: 'bg-[#6aaa64]',
  absent: 'bg-[#787c7e]',
};

type TileProps = {
  index: number;
  onLetterChange(value: string, index: number): void;
  onBackspacePress(
    keyDown: KeyboardEvent<HTMLInputElement>,
    index: number,
  ): void;
  isInputEnabled: boolean;
  tile: BoardState[number][number];
};

export const Tile = forwardRef(
  (
    {
      onLetterChange,
      index,
      isInputEnabled,
      tile,
      onBackspacePress,
    }: TileProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const backgroundColor = stateToBackgroundColor[tile.state];

    return (
      <input
        ref={ref}
        className={`w-16 h-16 flex justify-center font-sans items-center border-[#3a3a3c] text-white uppercase font-extrabold text-3xl text-center border-2 ${backgroundColor}`}
        value={tile.value}
        type="text"
        maxLength={1}
        onKeyDown={(keyDown) => onBackspacePress(keyDown, index)}
        disabled={!isInputEnabled}
        onInput={(e) => {
          if (!letterSchema.safeParse(e.currentTarget.value).success) {
            return;
          }
          onLetterChange(e.currentTarget.value, index);
        }}
      />
    );
  },
);
