import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SPACING } from '../constants/theme';
import type { ColorScheme } from '../constants/theme';

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  iconColor?: string;
  colors?: ColorScheme;
};

export const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  label,
  value,
  iconColor,
  colors,
}) => {
  const accent = iconColor ?? colors?.accent ?? '#FF8C00';
  const borderColor = colors?.borderColorLight ?? 'rgba(255, 255, 255, 0.05)';
  const labelColor = colors?.textMuted ?? '#6B6B8A';
  const valueColor = colors?.text ?? '#FFFFFF';
  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: `${accent}20` }]}>
        <Ionicons name={icon} size={20} color={accent} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
        <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    marginBottom: 2,
  },
  value: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.medium,
  },
});
