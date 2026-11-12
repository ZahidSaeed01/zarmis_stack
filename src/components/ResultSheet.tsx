import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COPY } from '@/constants/copy';
import { colors, radii, spacing, typography } from '@/constants/theme';
import { PrimaryButton } from '@/components/PrimaryButton';
import { formatScore } from '@/utils/format';

type Props = {
  score: number;
  best: number;
  isNewBest: boolean;
  onAgain: () => void;
  onArena: () => void;
};

export function ResultSheet({ score, best, isNewBest, onAgain, onArena }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.kicker}>{COPY.gameOver}</Text>
        {isNewBest ? <Text style={styles.badge}>{COPY.newBest}</Text> : null}
        <Text style={styles.score}>{formatScore(score)}</Text>
        <Text style={styles.best}>
          {COPY.best} · {formatScore(best)}
        </Text>
        <PrimaryButton label={COPY.playAgain} onPress={onAgain} style={styles.btn} />
        <PrimaryButton label={COPY.home} onPress={onArena} tone="ghost" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: radii.xl,
    padding: spacing.lg,
    backgroundColor: colors.backgroundElevated,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    gap: spacing.sm,
  },
  kicker: {
    ...typography.caption,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  badge: {
    ...typography.caption,
    color: colors.warn,
    textTransform: 'uppercase',
  },
  score: {
    ...typography.display,
    color: colors.text,
    marginVertical: spacing.sm,
  },
  best: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  btn: {
    marginBottom: spacing.sm,
  },
});
