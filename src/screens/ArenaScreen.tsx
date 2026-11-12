import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArenaBackdrop } from '@/components/ArenaBackdrop';
import { GlassChip } from '@/components/GlassChip';
import { PrimaryButton } from '@/components/PrimaryButton';
import { StackMark } from '@/components/StackMark';
import { COPY } from '@/constants/copy';
import { ARENA_MAX_WIDTH } from '@/constants/layout';
import { colors, spacing, typography } from '@/constants/theme';
import { loadStats, type StackStats, EMPTY_STATS } from '@/game/stats';
import type { Nav } from '@/navigation/types';
import { formatScore } from '@/utils/format';

export function ArenaScreen({ nav }: { nav: Nav }) {
  const insets = useSafeAreaInsets();
  const [stats, setStats] = useState<StackStats>(EMPTY_STATS);

  useEffect(() => {
    void loadStats().then(setStats);
  }, [nav.screen]);

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
        <View style={styles.topRow}>
          <GlassChip
            label={COPY.stats}
            onPress={nav.goStats}
            icon={<Ionicons name="trophy-outline" size={16} color={colors.accent} />}
          />
          <GlassChip
            label={COPY.settings}
            onPress={nav.goSettings}
            icon={<Ionicons name="options-outline" size={16} color={colors.textMuted} />}
          />
        </View>

        <View style={styles.hero}>
          <StackMark size={168} />
          <Text style={styles.brand}>{COPY.appName}</Text>
          <Text style={styles.tag}>{COPY.tagline}</Text>
          <Text style={styles.how}>{COPY.howBody}</Text>
        </View>

        <View style={styles.footer}>
          {stats.bestScore > 0 ? (
            <Text style={styles.best}>
              {COPY.best} · {formatScore(stats.bestScore)}
            </Text>
          ) : null}
          <PrimaryButton label={COPY.play} onPress={nav.goPlay} style={styles.play} />
        </View>
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
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  brand: {
    ...typography.display,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  tag: {
    ...typography.caption,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  how: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  footer: {
    gap: spacing.md,
    alignItems: 'center',
  },
  best: {
    ...typography.body,
    color: colors.textDim,
  },
  play: {
    alignSelf: 'stretch',
  },
});
