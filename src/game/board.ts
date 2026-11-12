import { BUFFER_ROWS, COLS, TOTAL_ROWS, type PieceId } from '@/constants/game';
import { cellsFor } from '@/game/pieces';
import type { ActivePiece, Cell, Grid } from '@/game/types';

export function emptyGrid(): Grid {
  return Array.from({ length: TOTAL_ROWS }, () =>
    Array.from({ length: COLS }, () => null as Cell),
  );
}

export function spawnPiece(id: PieceId): ActivePiece {
  return {
    id,
    rotation: 0,
    row: 0,
    col: Math.floor((COLS - 4) / 2),
  };
}

export function pieceCells(piece: ActivePiece): Array<{ r: number; c: number }> {
  return cellsFor(piece.id, piece.rotation).map(([dr, dc]) => ({
    r: piece.row + dr,
    c: piece.col + dc,
  }));
}

export function fits(grid: Grid, piece: ActivePiece): boolean {
  for (const { r, c } of pieceCells(piece)) {
    if (c < 0 || c >= COLS || r < 0 || r >= TOTAL_ROWS) return false;
    if (grid[r]![c]) return false;
  }
  return true;
}

export function lockPiece(grid: Grid, piece: ActivePiece): Grid {
  const next = grid.map((row) => row.slice());
  for (const { r, c } of pieceCells(piece)) {
    next[r]![c] = piece.id;
  }
  return next;
}

export function ghostRow(grid: Grid, piece: ActivePiece): number {
  let row = piece.row;
  let probe = { ...piece, row };
  while (fits(grid, { ...probe, row: row + 1 })) {
    row += 1;
    probe = { ...piece, row };
  }
  return row;
}

export function fullRows(grid: Grid): number[] {
  const rows: number[] = [];
  for (let r = BUFFER_ROWS; r < TOTAL_ROWS; r += 1) {
    if (grid[r]!.every((cell) => cell != null)) rows.push(r);
  }
  return rows;
}

export function clearRows(grid: Grid, rows: number[]): Grid {
  if (rows.length === 0) return grid;
  const kill = new Set(rows);
  const kept = grid.filter((_, i) => !kill.has(i));
  const pad = Array.from({ length: rows.length }, () =>
    Array.from({ length: COLS }, () => null as Cell),
  );
  return [...pad, ...kept];
}

/** Visible slice (skip buffer). */
export function visibleRowIndex(totalRow: number): number {
  return totalRow - BUFFER_ROWS;
}
