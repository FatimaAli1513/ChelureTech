export type ColorScheme = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  background: string;
  backgroundLight: string;
  backgroundCard: string;
  surface: string;
  surfaceLight: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  gradient: {
    primary: string[];
    accent: string[];
    dark: string[];
    card: string[];
  };
  borderColor: string;
  borderColorLight: string;
};

export const DARK_COLORS: ColorScheme = {
  primary: '#8B2B8B',
  primaryLight: '#A855A8',
  primaryDark: '#6B1B6B',
  accent: '#FF8C00',
  accentLight: '#FFA500',
  accentDark: '#E07B00',
  background: '#0A0A1A',
  backgroundLight: '#1A1A2E',
  backgroundCard: '#16162A',
  surface: '#1E1E3F',
  surfaceLight: '#2A2A4A',
  text: '#FFFFFF',
  textSecondary: '#B8B8D0',
  textMuted: '#6B6B8A',
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',
  gradient: {
    primary: ['#8B2B8B', '#E91E8C'],
    accent: ['#FF8C00', '#FFA500'],
    dark: ['#0A0A1A', '#1A1A2E'],
    card: ['#1E1E3F', '#16162A'],
  },
  borderColor: 'rgba(139, 43, 139, 0.3)',
  borderColorLight: 'rgba(255, 255, 255, 0.05)',
};

export const LIGHT_COLORS: ColorScheme = {
  primary: '#8B2B8B',
  primaryLight: '#A855A8',
  primaryDark: '#6B1B6B',
  accent: '#FF8C00',
  accentLight: '#FFA500',
  accentDark: '#E07B00',
  background: '#F5F5FA',
  backgroundLight: '#FFFFFF',
  backgroundCard: '#FFFFFF',
  surface: '#EEEEF5',
  surfaceLight: '#E8E8F0',
  text: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textMuted: '#6B6B8A',
  success: '#22C55E',
  warning: '#EAB308',
  error: '#EF4444',
  info: '#3B82F6',
  gradient: {
    primary: ['#8B2B8B', '#E91E8C'],
    accent: ['#FF8C00', '#FFA500'],
    dark: ['#F5F5FA', '#FFFFFF'],
    card: ['#FFFFFF', '#F8F8FC'],
  },
  borderColor: 'rgba(139, 43, 139, 0.2)',
  borderColorLight: 'rgba(0, 0, 0, 0.06)',
};

/** @deprecated Use useTheme() hook for theme-aware colors */
export const COLORS = DARK_COLORS;

export const FONTS = {
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
