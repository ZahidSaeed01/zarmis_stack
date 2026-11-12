import { STORAGE_KEYS } from '@/constants/storageKeys';
import { readJson, writeJson } from '@/utils/storage';

export type Preferences = {
  sound: boolean;
  haptics: boolean;
};

export const DEFAULT_PREFERENCES: Preferences = {
  sound: true,
  haptics: true,
};

export async function loadPreferences(): Promise<Preferences> {
  return readJson(STORAGE_KEYS.preferences, DEFAULT_PREFERENCES);
}

export async function savePreferences(prefs: Preferences): Promise<void> {
  await writeJson(STORAGE_KEYS.preferences, prefs);
}
