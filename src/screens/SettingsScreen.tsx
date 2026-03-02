import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Switch,
  Linking,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GradientCard } from '../components';
import { useTheme } from '../context/ThemeContext';
import { FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import type { ColorScheme } from '../constants/theme';

type SettingItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  showArrow?: boolean;
  onPress?: () => void;
  iconColor?: string;
  colors: ColorScheme;
};

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  value,
  showArrow = true,
  onPress,
  iconColor,
  colors,
}) => {
  const accent = iconColor ?? colors.accent;
  return (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.borderColorLight }]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <View style={[styles.settingIcon, { backgroundColor: `${accent}20` }]}>
        <Ionicons name={icon} size={20} color={accent} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
        {value && <Text style={[styles.settingValue, { color: colors.textMuted }]}>{value}</Text>}
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
};

type ToggleItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  iconColor?: string;
  colors: ColorScheme;
};

const ToggleItem: React.FC<ToggleItemProps> = ({
  icon,
  label,
  value,
  onValueChange,
  iconColor,
  colors,
}) => {
  const accent = iconColor ?? colors.accent;
  return (
    <View style={[styles.settingItem, { borderBottomColor: colors.borderColorLight }]}>
      <View style={[styles.settingIcon, { backgroundColor: `${accent}20` }]}>
        <Ionicons name={icon} size={20} color={accent} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surfaceLight, true: colors.primary }}
        thumbColor={value ? colors.accent : colors.textMuted}
      />
    </View>
  );
};

export const SettingsScreen: React.FC = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRateApp = () => {
    Linking.openURL('https://play.google.com/store');
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundLight]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.header}>
            <Ionicons name="settings" size={32} color={colors.accent} />
            <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Customize Your Experience
            </Text>
          </View>

          <GradientCard style={styles.card} colors={colors}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              Preferences
            </Text>
            <ToggleItem
              icon="moon-outline"
              label="Dark Mode"
              value={isDarkMode}
              onValueChange={toggleTheme}
              iconColor={colors.accent}
              colors={colors}
            />
            <ToggleItem
              icon="refresh-outline"
              label="Auto Refresh"
              value={autoRefresh}
              onValueChange={setAutoRefresh}
              iconColor={colors.success}
              colors={colors}
            />
          </GradientCard>

          <GradientCard style={styles.card} colors={colors}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              Support
            </Text>
            <SettingItem
              icon="star-outline"
              label="Rate App"
              onPress={handleRateApp}
              iconColor={colors.warning}
              colors={colors}
            />
            <SettingItem
              icon="help-circle-outline"
              label="Help Center"
              onPress={() => { }}
              iconColor={colors.info}
              colors={colors}
            />
          </GradientCard>

          <GradientCard style={styles.aboutCard} colors={colors}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.aboutLogo}
              resizeMode="contain"
            />
            <Text style={[styles.aboutTitle, { color: colors.text }]}>
              ChelureTech
            </Text>
            <Text style={[styles.aboutTagline, { color: colors.accent }]}>
              Global Network Solutions
            </Text>
            <Text style={[styles.version, { color: colors.textMuted }]}>
              Version 1.0.0
            </Text>
          </GradientCard>

        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 60,
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },
  card: {
    marginBottom: SPACING.lg,
  },
  sectionLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.medium,
  },
  settingValue: {
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  aboutCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  aboutLogo: {
    width: 80,
    height: 80,
    marginBottom: SPACING.md,
  },
  aboutTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
  },
  aboutTagline: {
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },
  version: {
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.sm,
  },
  copyright: {
    textAlign: 'center',
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
});
