import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArenaBackdrop } from '@/components/ArenaBackdrop';
import { GlassChip } from '@/components/GlassChip';
import { HudStat } from '@/components/HudStat';
import { NextPiece } from '@/components/NextPiece';
import { PlayControls } from '@/components/PlayControls';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ResultSheet } from '@/components/ResultSheet';
import { StackBoard } from '@/components/StackBoard';
import { COPY } from '@/constants/copy';
import { ARENA_MAX_WIDTH } from '@/constants/layout';
import { colors, spacing } from '@/constants/theme';
import { buzz } from '@/feedback/playFeedback';
import { loadStats, recordRun } from '@/game/stats';
import { useStackGame } from '@/game/useStackGame';
import type { Nav } from '@/navigation/types';
import { usePreferences } from '@/settings/PreferencesContext';
import { formatScore } from '@/utils/format';

type Props = {
  nav: Nav;
  sessionKey: string;
  onReplay: () => void;
};

export function PlayScreen({ nav, sessionKey, onReplay }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const prefs = usePreferences();
  const game = useStackGame(sessionKey);
  const [best, setBest] = useState(0);
  const recorded = useRef(false);

  const boardWidth = Math.min(width - 48, ARENA_MAX_WIDTH - 48, 340);

  useEffect(() => {
    void loadStats().then((s) => setBest(s.bestScore));
  }, []);

  useEffect(() => {
    if (game.view.status !== 'over' || recorded.current) return;
    recorded.current = true;
    void (async () => {
      const next = await recordRun(game.view.score, game.view.lines);
      setBest(next.bestScore);
      await buzz(prefs.haptics, 'success');
    })();
  }, [game.view.status, game.view.score, game.view.lines, prefs.haptics]);

  useEffect(() => {
    recorded.current = false;
  }, [sessionKey]);

  const onMove = async (fn: () => void, style: 'light' | 'medium' = 'light') => {
    fn();
    await buzz(prefs.haptics, style);
  };

  return (
    <ArenaBackdrop>
      <View
        style={[
          styles.shell,
          {
            paddingTop: insets.top + spacing.sm,
            paddingBottom: insets.bottom + spacing.sm,
          },
        ]}
      >
        <View style={styles.top}>
          <GlassChip
            label={COPY.pause}
            onPress={game.pause}
            icon={<Ionicons name="pause" size={14} color={colors.text} />}
          />
          <View style={styles.hudRow}>
            <HudStat label={COPY.score} value={formatScore(game.view.score)} />
            <HudStat label={COPY.level} value={String(game.view.level)} />
            <HudStat label={COPY.lines} value={String(game.view.lines)} />
            <NextPiece id={game.view.next} />
          </View>
        </View>

        <View style={styles.boardWrap}>
          <StackBoard
            width={boardWidth}
            grid={game.view.grid}
            active={game.view.active}
            ghostRow={game.view.ghostRow}
            clearingRows={game.view.clearingRows}
          />
        </View>

        <PlayControls
          onLeft={() => void onMove(game.moveLeft)}
          onRight={() => void onMove(game.moveRight)}
          onRotate={() => void onMove(game.rotateCW, 'medium')}
          onSoftStart={game.softDropStart}
          onSoftEnd={game.softDropEnd}
          onHard={() => void onMove(game.hardDrop, 'medium')}
        />
      </View>

      {game.view.status === 'paused' ? (
        <View style={styles.pauseOverlay}>
          <View style={styles.pauseCard}>
            <PrimaryButton label={COPY.resume} onPress={game.resume} />
            <PrimaryButton label={COPY.settings} onPress={nav.goSettings} tone="ghost" />
            <PrimaryButton label={COPY.home} onPress={nav.goArena} tone="ghost" />
          </View>
        </View>
      ) : null}

      {game.view.status === 'over' ? (
        <ResultSheet
          score={game.view.score}
          best={best}
          isNewBest={game.view.score >= best && game.view.score > 0}
          onAgain={onReplay}
          onArena={nav.goArena}
        />
      ) : null}
    </ArenaBackdrop>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: ARENA_MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  top: {
    gap: spacing.sm,
  },
  hudRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'stretch',
  },
  boardWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  pauseCard: {
    width: '100%',
    maxWidth: 320,
    gap: spacing.sm,
  },
});
