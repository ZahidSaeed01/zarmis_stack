import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Platform, StatusBar, ToastAndroid, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { COPY } from '@/constants/copy';
import { EXIT_WINDOW_MS } from '@/constants/layout';
import { colors } from '@/constants/theme';
import type { AppScreen, Nav } from '@/navigation/types';
import { ArenaScreen } from '@/screens/ArenaScreen';
import { PlayScreen } from '@/screens/PlayScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { StatsScreen } from '@/screens/StatsScreen';
import { PreferencesProvider } from '@/settings/PreferencesContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <PreferencesProvider>
        <AppNavigator />
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}

function AppNavigator() {
  const [screen, setScreen] = useState<AppScreen>('arena');
  const [playNonce, setPlayNonce] = useState(0);
  const historyRef = useRef<AppScreen[]>(['arena']);
  const lastBackAtRef = useRef(0);

  const push = useCallback((next: AppScreen) => {
    setScreen((current) => {
      if (current === next) return current;
      historyRef.current = [...historyRef.current, next];
      return next;
    });
  }, []);

  const goArena = useCallback(() => {
    historyRef.current = ['arena'];
    setScreen('arena');
  }, []);

  const goPlay = useCallback(() => {
    setPlayNonce((n) => n + 1);
    push('play');
  }, [push]);

  const goSettings = useCallback(() => push('settings'), [push]);
  const goStats = useCallback(() => push('stats'), [push]);

  const replay = useCallback(() => {
    setPlayNonce((n) => n + 1);
    historyRef.current = ['arena', 'play'];
    setScreen('play');
  }, []);

  const goBack = useCallback(() => {
    const history = historyRef.current;
    if (history.length > 1) {
      const next = history.slice(0, -1);
      historyRef.current = next;
      setScreen(next[next.length - 1]!);
      return true;
    }
    if (Platform.OS === 'android') {
      const now = Date.now();
      if (now - lastBackAtRef.current < EXIT_WINDOW_MS) return false;
      lastBackAtRef.current = now;
      ToastAndroid.show(COPY.pressBackAgain, ToastAndroid.SHORT);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => goBack());
    return () => sub.remove();
  }, [goBack]);

  const nav: Nav = useMemo(
    () => ({
      screen,
      goArena,
      goPlay,
      goSettings,
      goStats,
      goBack,
    }),
    [screen, goArena, goPlay, goSettings, goStats, goBack],
  );

  let body: React.ReactNode = null;
  switch (screen) {
    case 'arena':
      body = <ArenaScreen nav={nav} />;
      break;
    case 'play':
      body = (
        <PlayScreen
          key={playNonce}
          nav={nav}
          sessionKey={`play-${playNonce}`}
          onReplay={replay}
        />
      );
      break;
    case 'settings':
      body = <SettingsScreen nav={nav} />;
      break;
    case 'stats':
      body = <StatsScreen nav={nav} />;
      break;
  }

  return <View style={{ flex: 1, backgroundColor: colors.background }}>{body}</View>;
}
