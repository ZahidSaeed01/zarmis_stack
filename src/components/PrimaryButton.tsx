import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  tone?: 'accent' | 'ghost';
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ label, onPress, tone = 'accent', style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        tone === 'accent' ? styles.accent : styles.ghost,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, tone === 'ghost' && styles.ghostLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accent: {
    backgroundColor: colors.accent,
  },
  ghost: {
    backgroundColor: colors.control,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  label: {
    ...typography.title,
    color: colors.backgroundDeep,
  },
  ghostLabel: {
    color: colors.text,
  },
});
