import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BORDER_RADIUS, SPACING } from '../constants/theme';
import type { ColorScheme } from '../constants/theme';

type GradientCardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: string[];
  colors?: ColorScheme;
};

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  style,
  gradient,
  colors,
}) => {
  const cardGradient = gradient ?? colors?.gradient.card ?? ['#1E1E3F', '#16162A'];
  const borderColor = colors?.borderColor ?? 'rgba(139, 43, 139, 0.3)';
  return (
    <LinearGradient
      colors={cardGradient as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, style, { borderColor }]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
  },
});
