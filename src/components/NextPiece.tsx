import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COPY } from '@/constants/copy';
import type { PieceId } from '@/constants/game';
import { colors, pieceColors, radii, spacing, typography } from '@/constants/theme';
import { cellsFor } from '@/game/pieces';

const CELL = 12;

export function NextPiece({ id }: { id: PieceId }) {
  const cells = cellsFor(id, 0);
  const maxR = Math.max(...cells.map(([r]) => r));
  const maxC = Math.max(...cells.map(([, c]) => c));

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{COPY.next}</Text>
      <View
        style={[
          styles.board,
          { width: (maxC + 1) * (CELL + 2), height: (maxR + 1) * (CELL + 2) },
        ]}
      >
        {cells.map(([r, c]) => (
          <View
            key={`${r}-${c}`}
            style={[
              styles.cell,
              {
                left: c * (CELL + 2),
                top: r * (CELL + 2),
                backgroundColor: pieceColors[id],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.glass,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    minWidth: 72,
  },
  label: {
    ...typography.caption,
    color: colors.textDim,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  board: {
    position: 'relative',
  },
  cell: {
    position: 'absolute',
    width: CELL,
    height: CELL,
    borderRadius: 3,
  },
});
