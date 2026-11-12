import type { PieceId } from '@/constants/game';

export type Cell = PieceId | null;

export type Grid = Cell[][];

export type ActivePiece = {
  id: PieceId;
  rotation: number;
  row: number;
  col: number;
};

export type GameStatus = 'playing' | 'paused' | 'over';

export type GameSnapshot = {
  grid: Grid;
  active: ActivePiece | null;
  ghostRow: number;
  next: PieceId;
  score: number;
  lines: number;
  level: number;
  status: GameStatus;
  clearingRows: number[];
};
