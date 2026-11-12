export type AppScreen = 'arena' | 'play' | 'settings' | 'stats';

export type Nav = {
  screen: AppScreen;
  goArena: () => void;
  goPlay: () => void;
  goSettings: () => void;
  goStats: () => void;
  goBack: () => boolean;
};
