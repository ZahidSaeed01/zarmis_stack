import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  LOCK_DELAY_MS,
  SCORE,
  SOFT_DROP_MS,
  type PieceId,
} from '@/constants/game';
import {
  clearRows,
  emptyGrid,
  fits,
  fullRows,
  ghostRow,
  lockPiece,
  spawnPiece,
} from '@/game/board';
import { createBag } from '@/game/bag';
import { gravityMsForLevel, levelFromLines, lineClearPoints } from '@/game/scoring';
import type { ActivePiece, GameSnapshot, GameStatus, Grid } from '@/game/types';

type Internal = {
  grid: Grid;
  active: ActivePiece | null;
  next: PieceId;
  bag: ReturnType<typeof createBag>;
  score: number;
  lines: number;
  status: GameStatus;
  clearingRows: number[];
  softDropping: boolean;
};

function snapshot(state: Internal): GameSnapshot {
  const level = levelFromLines(state.lines);
  const ghost = state.active ? ghostRow(state.grid, state.active) : 0;
  return {
    grid: state.grid,
    active: state.active,
    ghostRow: ghost,
    next: state.next,
    score: state.score,
    lines: state.lines,
    level,
    status: state.status,
    clearingRows: state.clearingRows,
  };
}

function createFresh(): Internal {
  const bag = createBag();
  const first = bag.next();
  const next = bag.next();
  const grid = emptyGrid();
  const active = spawnPiece(first);
  const ok = fits(grid, active);
  return {
    grid,
    active: ok ? active : null,
    next,
    bag,
    score: 0,
    lines: 0,
    status: ok ? 'playing' : 'over',
    clearingRows: [],
    softDropping: false,
  };
}

export function useStackGame(sessionKey: string) {
  const stateRef = useRef<Internal>(createFresh());
  const [view, setView] = useState<GameSnapshot>(() => snapshot(stateRef.current));
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const publish = useCallback(() => {
    setView(snapshot(stateRef.current));
  }, []);

  const clearLock = useCallback(() => {
    if (lockTimer.current) {
      clearTimeout(lockTimer.current);
      lockTimer.current = null;
    }
  }, []);

  const spawnNext = useCallback(() => {
    const s = stateRef.current;
    const id = s.next;
    s.next = s.bag.next();
    const piece = spawnPiece(id);
    if (!fits(s.grid, piece)) {
      s.active = null;
      s.status = 'over';
      return;
    }
    s.active = piece;
  }, []);

  const finishClear = useCallback(() => {
    const s = stateRef.current;
    const rows = s.clearingRows;
    if (rows.length === 0) return;
    s.grid = clearRows(s.grid, rows);
    s.lines += rows.length;
    s.score += lineClearPoints(rows.length, levelFromLines(s.lines - rows.length));
    s.clearingRows = [];
    spawnNext();
    publish();
  }, [publish, spawnNext]);

  const commitLock = useCallback(() => {
    const s = stateRef.current;
    if (!s.active || s.status !== 'playing') return;
    clearLock();
    s.grid = lockPiece(s.grid, s.active);
    s.active = null;
    const rows = fullRows(s.grid);
    if (rows.length > 0) {
      s.clearingRows = rows;
      publish();
      setTimeout(finishClear, 180);
      return;
    }
    spawnNext();
    publish();
  }, [clearLock, finishClear, publish, spawnNext]);

  const scheduleLock = useCallback(() => {
    clearLock();
    lockTimer.current = setTimeout(() => {
      const s = stateRef.current;
      if (!s.active || s.status !== 'playing') return;
      if (fits(s.grid, { ...s.active, row: s.active.row + 1 })) return;
      commitLock();
    }, LOCK_DELAY_MS);
  }, [clearLock, commitLock]);

  const tryMove = useCallback(
    (dRow: number, dCol: number): boolean => {
      const s = stateRef.current;
      if (!s.active || s.status !== 'playing') return false;
      const next = {
        ...s.active,
        row: s.active.row + dRow,
        col: s.active.col + dCol,
      };
      if (!fits(s.grid, next)) return false;
      s.active = next;
      if (!fits(s.grid, { ...next, row: next.row + 1 })) scheduleLock();
      else clearLock();
      publish();
      return true;
    },
    [clearLock, publish, scheduleLock],
  );

  const rotate = useCallback(
    (dir: 1 | -1 = 1) => {
      const s = stateRef.current;
      if (!s.active || s.status !== 'playing') return;
      const base = {
        ...s.active,
        rotation: s.active.rotation + dir,
      };
      const kicks = [0, -1, 1, -2, 2];
      for (const kick of kicks) {
        const next = { ...base, col: base.col + kick };
        if (fits(s.grid, next)) {
          s.active = next;
          if (!fits(s.grid, { ...next, row: next.row + 1 })) scheduleLock();
          else clearLock();
          publish();
          return;
        }
      }
    },
    [clearLock, publish, scheduleLock],
  );

  const softDropStep = useCallback(() => {
    const moved = tryMove(1, 0);
    if (moved) {
      stateRef.current.score += SCORE.softDropPerCell;
      publish();
    } else {
      commitLock();
    }
  }, [commitLock, publish, tryMove]);

  const hardDrop = useCallback(() => {
    const s = stateRef.current;
    if (!s.active || s.status !== 'playing') return;
    let dropped = 0;
    while (fits(s.grid, { ...s.active, row: s.active.row + 1 })) {
      s.active = { ...s.active, row: s.active.row + 1 };
      dropped += 1;
    }
    s.score += dropped * SCORE.hardDropPerCell;
    publish();
    commitLock();
  }, [commitLock, publish]);

  const setSoftDropping = useCallback((on: boolean) => {
    stateRef.current.softDropping = on;
  }, []);

  const pause = useCallback(() => {
    const s = stateRef.current;
    if (s.status === 'playing') {
      s.status = 'paused';
      clearLock();
      publish();
    }
  }, [clearLock, publish]);

  const resume = useCallback(() => {
    const s = stateRef.current;
    if (s.status === 'paused') {
      s.status = 'playing';
      publish();
    }
  }, [publish]);

  const reset = useCallback(() => {
    clearLock();
    stateRef.current = createFresh();
    publish();
  }, [clearLock, publish]);

  // Gravity loop
  useEffect(() => {
    stateRef.current = createFresh();
    publish();
    clearLock();
  }, [sessionKey, clearLock, publish]);

  useEffect(() => {
    const id = setInterval(() => {
      const s = stateRef.current;
      if (s.status !== 'playing' || !s.active || s.clearingRows.length) return;
      const ms = s.softDropping
        ? SOFT_DROP_MS
        : gravityMsForLevel(levelFromLines(s.lines));
      // Simple interval: re-check via nested timer approach — use tick accumulator
      void ms;
    }, 16);
    return () => clearInterval(id);
  }, []);

  // Dedicated gravity timer that resets when level / soft-drop changes
  const gravityKey = `${view.level}-${view.status}-${sessionKey}`;
  useEffect(() => {
    if (view.status !== 'playing') return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      const s = stateRef.current;
      if (s.status !== 'playing' || !s.active || s.clearingRows.length) {
        timer = setTimeout(tick, 50);
        return;
      }
      const delay = s.softDropping
        ? SOFT_DROP_MS
        : gravityMsForLevel(levelFromLines(s.lines));
      timer = setTimeout(() => {
        if (cancelled) return;
        const cur = stateRef.current;
        if (cur.status !== 'playing' || !cur.active) {
          tick();
          return;
        }
        if (cur.softDropping) softDropStep();
        else if (!tryMove(1, 0)) scheduleLock();
        tick();
      }, delay);
    };
    tick();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [gravityKey, scheduleLock, softDropStep, tryMove, view.status]);

  const api = useMemo(
    () => ({
      moveLeft: () => tryMove(0, -1),
      moveRight: () => tryMove(0, 1),
      rotateCW: () => rotate(1),
      rotateCCW: () => rotate(-1),
      softDropStart: () => setSoftDropping(true),
      softDropEnd: () => setSoftDropping(false),
      hardDrop,
      pause,
      resume,
      reset,
    }),
    [hardDrop, pause, resume, reset, rotate, setSoftDropping, tryMove],
  );

  return { view, ...api };
}
