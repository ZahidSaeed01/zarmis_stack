import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArenaBackdrop } from '@/components/ArenaBackdrop';
import { GlassChip } from '@/components/GlassChip';
import { COPY } from '@/constants/copy';
import { ARENA_MAX_WIDTH } from '@/constants/layout';
import { colors, radii, spacing, typography } from '@/constants/theme';
import { EMPTY_STATS, loadStats, type StackStats } from '@/game/stats';
import type { Nav } from '@/navigation/types';
import { formatScore } from '@/utils/format';

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockLabel}>{label}</Text>
      <Text style={styles.blockValue}>{value}</Text>
    </View>
  );
}

export function StatsScreen({ nav }: { nav: Nav }) {
  const insets = useSafeAreaInsets();
  const [stats, setStats] = useState<StackStats>(EMPTY_STATS);

  useEffect(() => {
    void loadStats().then(setStats);
  }, []);

  return (
    <ArenaBackdrop>
      <View
        style={[
          styles.shell,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + spacing.lg,
          },
        ]}
      >
        <GlassChip
          label={COPY.home}
          onPress={nav.goBack}
          icon={<Ionicons name="arrow-back" size={16} color={colors.text} />}
        />
        <Text style={styles.title}>{COPY.stats}</Text>
        {stats.gamesPlayed === 0 ? (
          <Text style={styles.empty}>{COPY.emptyStats}</Text>
        ) : (
          <View style={styles.grid}>
            <StatBlock label={COPY.best} value={formatScore(stats.bestScore)} />
            <StatBlock label={COPY.gamesPlayed} value={String(stats.gamesPlayed)} />
            <StatBlock label={COPY.totalLines} value={String(stats.totalLines)} />
            <StatBlock label={COPY.score} value={formatScore(stats.lastScore)} />
          </View>
        )}
      </View>
    </ArenaBackdrop>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: ARENA_MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  title: {
    ...typography.display,
    fontSize: 36,
    color: colors.text,
  },
  empty: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  grid: {
    gap: spacing.sm,
  },
  block: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.glass,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  blockLabel: {
    ...typography.caption,
    color: colors.textDim,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  blockValue: {
    ...typography.title,
    color: colors.text,
  },
});
