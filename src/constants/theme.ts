import { BRAND_ACCENT, BRAND_BACKGROUND } from '@/constants/brand';

/**
 * Stack visual system — ink pit + teal gravity.
 * No bottom tab chrome; arena stage + floating glass controls.
 */
export const colors = {
  background: BRAND_BACKGROUND,
  backgroundDeep: '#060B14',
  backgroundElevated: '#121A2B',
  pit: '#070D18',
  pitInner: '#0C1524',
  pitRim: 'rgba(45, 212, 191, 0.35)',
  accent: BRAND_ACCENT,
  accentSoft: 'rgba(45, 212, 191, 0.22)',
  accentGlow: 'rgba(45, 212, 191, 0.45)',
  warn: '#F59E0B',
  warnSoft: 'rgba(245, 158, 11, 0.22)',
  text: '#F8FAFC',
  textMuted: 'rgba(248, 250, 252, 0.72)',
  textDim: 'rgba(248, 250, 252, 0.42)',
  success: '#34D399',
  danger: '#FB7185',
  glass: 'rgba(15, 23, 42, 0.72)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  overlay: 'rgba(4, 8, 16, 0.78)',
  ghost: 'rgba(248, 250, 252, 0.16)',
  control: 'rgba(255, 255, 255, 0.08)',
  controlActive: 'rgba(45, 212, 191, 0.28)',
} as const;

/** Piece fill colors — distinct on dark pit. */
export const pieceColors = {
  I: '#22D3EE',
  O: '#FBBF24',
  T: '#A78BFA',
  L: '#FB923C',
  J: '#60A5FA',
  S: '#4ADE80',
  Z: '#F87171',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 36,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const motion = {
  sheetIn: 280,
  clearFlash: 180,
  lockPop: 120,
  homeFloat: 2400,
} as const;

export const typography = {
  display: {
    fontSize: 44,
    fontWeight: '800' as const,
    letterSpacing: -1.2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  body: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: '600' as const,
    letterSpacing: 0.4,
  },
  hud: {
    fontSize: 18,
    fontWeight: '700' as const,
  },
};
