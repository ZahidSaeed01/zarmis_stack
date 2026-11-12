import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArenaBackdrop } from '@/components/ArenaBackdrop';
import { GlassChip } from '@/components/GlassChip';
import { PRIVACY_POLICY_URL } from '@/constants/brand';
import { COPY } from '@/constants/copy';
import { ARENA_MAX_WIDTH } from '@/constants/layout';
import { colors, radii, spacing, typography } from '@/constants/theme';
import type { Nav } from '@/navigation/types';
import { usePreferences } from '@/settings/PreferencesContext';

function Row({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.control, true: colors.accentSoft }}
        thumbColor={value ? colors.accent : colors.textDim}
      />
    </View>
  );
}

export function SettingsScreen({ nav }: { nav: Nav }) {
  const insets = useSafeAreaInsets();
  const prefs = usePreferences();

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
        <Text style={styles.title}>{COPY.settings}</Text>
        <View style={styles.card}>
          <Row label={COPY.sound} value={prefs.sound} onValueChange={prefs.setSound} />
          <Row
            label={COPY.haptics}
            value={prefs.haptics}
            onValueChange={prefs.setHaptics}
          />
        </View>
        <Pressable
          onPress={() => void Linking.openURL(PRIVACY_POLICY_URL)}
          style={styles.link}
        >
          <Text style={styles.linkText}>{COPY.privacy}</Text>
          <Ionicons name="open-outline" size={16} color={colors.accent} />
        </Pressable>
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
  card: {
    borderRadius: radii.lg,
    backgroundColor: colors.glass,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.glassBorder,
  },
  rowLabel: {
    ...typography.body,
    color: colors.text,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  linkText: {
    ...typography.body,
    color: colors.accent,
  },
});
