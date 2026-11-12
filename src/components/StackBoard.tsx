import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { BUFFER_ROWS, COLS, ROWS, type PieceId } from '@/constants/game';
import { BOARD_GAP } from '@/constants/layout';
import { colors, pieceColors, radii } from '@/constants/theme';
import { pieceCells } from '@/game/board';
import type { ActivePiece, Grid } from '@/game/types';

type Props = {
  grid: Grid;
  active: ActivePiece | null;
  ghostRow: number;
  clearingRows: number[];
  width: number;
};

export function StackBoard({
  grid,
  active,
  ghostRow,
  clearingRows,
  width,
}: Props) {
  const cell = useMemo(() => {
    const inner = width - BOARD_GAP * (COLS + 1);
    return Math.floor(inner / COLS);
  }, [width]);

  const boardW = cell * COLS + BOARD_GAP * (COLS + 1);
  const boardH = cell * ROWS + BOARD_GAP * (ROWS + 1);
  const clearSet = useMemo(() => new Set(clearingRows), [clearingRows]);

  const activeMap = useMemo(() => {
    const map = new Map<string, PieceId>();
    if (!active) return map;
    for (const { r, c } of pieceCells(active)) {
      map.set(`${r},${c}`, active.id);
    }
    return map;
  }, [active]);

  const ghostMap = useMemo(() => {
    const map = new Set<string>();
    if (!active) return map;
    const ghost = { ...active, row: ghostRow };
    for (const { r, c } of pieceCells(ghost)) {
      const key = `${r},${c}`;
      if (!activeMap.has(key)) map.add(key);
    }
    return map;
  }, [active, activeMap, ghostRow]);

  return (
    <View style={[styles.rim, { width: boardW + 10, padding: 5 }]}>
      <View style={[styles.pit, { width: boardW, height: boardH }]}>
        {Array.from({ length: ROWS }, (_, visR) => {
          const r = visR + BUFFER_ROWS;
          return Array.from({ length: COLS }, (_, c) => {
            const locked = grid[r]![c];
            const falling = activeMap.get(`${r},${c}`);
            const id = falling ?? locked;
            const ghost = !id && ghostMap.has(`${r},${c}`);
            const clearing = clearSet.has(r);
            return (
              <View
                key={`${r}-${c}`}
                style={[
                  styles.cell,
                  {
                    width: cell,
                    height: cell,
                    left: BOARD_GAP + c * (cell + BOARD_GAP),
                    top: BOARD_GAP + visR * (cell + BOARD_GAP),
                    backgroundColor: id
                      ? pieceColors[id]
                      : ghost
                        ? colors.ghost
                        : colors.pitInner,
                    opacity: clearing ? 0.35 : 1,
                  },
                ]}
              />
            );
          });
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rim: {
    borderRadius: radii.lg,
    backgroundColor: colors.pitRim,
    alignSelf: 'center',
  },
  pit: {
    backgroundColor: colors.pit,
    borderRadius: radii.md,
    overflow: 'hidden',
    position: 'relative',
  },
  cell: {
    position: 'absolute',
    borderRadius: 4,
  },
});
