import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  DEFAULT_PREFERENCES,
  loadPreferences,
  savePreferences,
  type Preferences,
} from '@/settings/preferences';

type Ctx = Preferences & {
  ready: boolean;
  setSound: (v: boolean) => void;
  setHaptics: (v: boolean) => void;
};

const PreferencesContext = createContext<Ctx | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    loadPreferences().then((p) => {
      if (!alive) return;
      setPrefs(p);
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const persist = useCallback((next: Preferences) => {
    setPrefs(next);
    void savePreferences(next);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ...prefs,
      ready,
      setSound: (sound) => persist({ ...prefs, sound }),
      setHaptics: (haptics) => persist({ ...prefs, haptics }),
    }),
    [prefs, persist, ready],
  );

  return (
    <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
  );
}

export function usePreferences(): Ctx {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences outside provider');
  return ctx;
}
