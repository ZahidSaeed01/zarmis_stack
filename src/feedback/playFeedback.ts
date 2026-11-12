import * as Haptics from 'expo-haptics';

export async function buzz(
  enabled: boolean,
  style: 'light' | 'medium' | 'success' = 'light',
) {
  if (!enabled) return;
  try {
    if (style === 'success') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }
    await Haptics.impactAsync(
      style === 'medium'
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Light,
    );
  } catch {
    // no-op on unsupported platforms
  }
}
