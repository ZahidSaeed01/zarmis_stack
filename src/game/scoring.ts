import {
  BASE_GRAVITY_MS,
  LINES_PER_LEVEL,
  MIN_GRAVITY_MS,
  SCORE,
} from '@/constants/game';

export function levelFromLines(lines: number): number {
  return Math.floor(lines / LINES_PER_LEVEL) + 1;
}

export function gravityMsForLevel(level: number): number {
  const stepped = BASE_GRAVITY_MS - (level - 1) * 70;
  return Math.max(MIN_GRAVITY_MS, stepped);
}

export function lineClearPoints(cleared: number, level: number): number {
  const base = SCORE.lineClears[Math.min(cleared, 4)] ?? 0;
  return base * level;
}
