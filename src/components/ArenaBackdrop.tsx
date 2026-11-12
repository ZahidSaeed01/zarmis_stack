import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

/** Full-bleed ink pit with soft teal / amber washes — no flat single fill. */
export function ArenaBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <View style={styles.washTeal} />
      <View style={styles.washAmber} />
      <View style={styles.vignette} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  washTeal: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.accentGlow,
    opacity: 0.35,
  },
  washAmber: {
    position: 'absolute',
    bottom: 40,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.warnSoft,
    opacity: 0.55,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});
