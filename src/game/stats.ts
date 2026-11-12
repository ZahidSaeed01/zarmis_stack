import { STORAGE_KEYS } from '@/constants/storageKeys';
import { readJson, writeJson } from '@/utils/storage';

export type StackStats = {
  bestScore: number;
  gamesPlayed: number;
  totalLines: number;
  lastScore: number;
};

export const EMPTY_STATS: StackStats = {
  bestScore: 0,
  gamesPlayed: 0,
  totalLines: 0,
  lastScore: 0,
};

export async function loadStats(): Promise<StackStats> {
  return readJson(STORAGE_KEYS.stats, EMPTY_STATS);
}

export async function recordRun(
  score: number,
  lines: number,
): Promise<StackStats> {
  const prev = await loadStats();
  const next: StackStats = {
    bestScore: Math.max(prev.bestScore, score),
    gamesPlayed: prev.gamesPlayed + 1,
    totalLines: prev.totalLines + lines,
    lastScore: score,
  };
  await writeJson(STORAGE_KEYS.stats, next);
  return next;
}
