export type BoardState = {
  value: string;
  state: TileState;
}[][];

export type TileState = 'unchecked' | 'present' | 'correct' | 'absent';
