import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CONTROL_HIT } from '@/constants/layout';
import { colors, radii } from '@/constants/theme';

type Props = {
  onLeft: () => void;
  onRight: () => void;
  onRotate: () => void;
  onSoftStart: () => void;
  onSoftEnd: () => void;
  onHard: () => void;
};

function Ctrl({
  onPress,
  onPressIn,
  onPressOut,
  icon,
}: {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
    >
      <Ionicons name={icon} size={26} color={colors.text} />
    </Pressable>
  );
}

export function PlayControls({
  onLeft,
  onRight,
  onRotate,
  onSoftStart,
  onSoftEnd,
  onHard,
}: Props) {
  return (
    <View style={styles.row}>
      <Ctrl icon="chevron-back" onPress={onLeft} />
      <Ctrl icon="chevron-forward" onPress={onRight} />
      <Ctrl icon="reload" onPress={onRotate} />
      <Ctrl
        icon="chevron-down"
        onPressIn={onSoftStart}
        onPressOut={onSoftEnd}
        onPress={onSoftEnd}
      />
      <Ctrl icon="download-outline" onPress={onHard} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 4,
  },
  btn: {
    width: CONTROL_HIT,
    height: CONTROL_HIT,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.control,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  btnPressed: {
    backgroundColor: colors.controlActive,
  },
});
