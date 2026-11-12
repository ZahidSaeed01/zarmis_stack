/** Visible well size (classic falling-block). */
export const COLS = 10;
export const ROWS = 20;
/** Hidden rows above the visible well for spawn / rotation. */
export const BUFFER_ROWS = 2;
export const TOTAL_ROWS = ROWS + BUFFER_ROWS;

export const LINES_PER_LEVEL = 10;
export const BASE_GRAVITY_MS = 900;
export const MIN_GRAVITY_MS = 120;
export const SOFT_DROP_MS = 40;
export const LOCK_DELAY_MS = 450;

export const SCORE = {
  softDropPerCell: 1,
  hardDropPerCell: 2,
  lineClears: [0, 100, 300, 500, 800] as const,
} as const;

export type PieceId = 'I' | 'O' | 'T' | 'L' | 'J' | 'S' | 'Z';

export const PIECE_IDS: PieceId[] = ['I', 'O', 'T', 'L', 'J', 'S', 'Z'];
