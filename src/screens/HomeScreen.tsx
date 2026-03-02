import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Network from 'expo-network';
import { GradientCard, StatusIndicator } from '../components';
import { useTheme } from '../context/ThemeContext';
import { FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

type NetworkState = {
  isConnected: boolean;
  type: string;
  isInternetReachable: boolean;
};

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: false,
    type: 'Unknown',
    isInternetReachable: false,
  });
  const [ipAddress, setIpAddress] = useState<string>('---.---.---.---');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    fetchNetworkInfo();
  }, []);

  const fetchNetworkInfo = async () => {
    try {
      const state = await Network.getNetworkStateAsync();
      setNetworkState({
        isConnected: state.isConnected ?? false,
        type: state.type ?? 'Unknown',
        isInternetReachable: state.isInternetReachable ?? false,
      });

      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);
    } catch (error) {
      console.log('Error fetching network info:', error);
    }
  };

  const getConnectionTypeName = (type: string): string => {
    const types: Record<string, string> = {
      WIFI: 'WiFi',
      CELLULAR: 'Mobile Data',
      ETHERNET: 'Ethernet',
      BLUETOOTH: 'Bluetooth',
      VPN: 'VPN',
      UNKNOWN: 'Unknown',
      NONE: 'None',
    };
    return types[type] || type;
  };

  const quickActions = [
    { icon: 'refresh-outline' as const, label: 'Refresh', onPress: fetchNetworkInfo },
    { icon: 'share-outline' as const, label: 'Share IP', onPress: () => {} },
    { icon: 'copy-outline' as const, label: 'Copy', onPress: () => {} },
  ];

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundLight]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image
            source={require('../../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, { color: colors.text }]}>ChelureTech</Text>
          <Text style={[styles.subtitle, { color: colors.accent }]}>Global Network Solutions</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <GradientCard style={styles.mainCard} colors={colors}>
            <View style={styles.statusHeader}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Network Status</Text>
              <StatusIndicator
                isConnected={networkState.isConnected}
                label={networkState.isConnected ? 'Online' : 'Offline'}
                colors={colors}
              />
            </View>

            <View style={styles.connectionInfo}>
              <View style={styles.connectionIcon}>
                <Ionicons
                  name={
                    networkState.type === 'WIFI'
                      ? 'wifi'
                      : networkState.type === 'CELLULAR'
                      ? 'cellular'
                      : 'globe-outline'
                  }
                  size={48}
                  color={colors.accent}
                />
              </View>
              <Text style={[styles.connectionType, { color: colors.text }]}>
                {getConnectionTypeName(networkState.type)}
              </Text>
              <Text style={[styles.ipLabel, { color: colors.textMuted }]}>IP Address</Text>
              <Text style={[styles.ipAddress, { color: colors.accent }]}>{ipAddress}</Text>
            </View>

            <View style={[styles.quickActions, { borderTopColor: colors.borderColorLight }]}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickActionBtn}
                  onPress={action.onPress}
                  activeOpacity={0.7}
                  accessibilityLabel={action.label}
                  accessibilityRole="button"
                >
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    style={styles.quickActionGradient}
                  >
                    <Ionicons name={action.icon} size={20} color={colors.text} />
                  </LinearGradient>
                  <Text style={[styles.quickActionLabel, { color: colors.textSecondary }]}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </GradientCard>

          <View style={styles.statsRow}>
            <GradientCard style={styles.statCard} colors={colors}>
              <Ionicons name="cloud-done-outline" size={28} color={colors.success} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {networkState.isInternetReachable ? 'Yes' : 'No'}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Internet</Text>
            </GradientCard>

            <GradientCard style={styles.statCard} colors={colors}>
              <Ionicons
                name={networkState.type === 'WIFI' ? 'wifi' : 'cellular'}
                size={28}
                color={colors.accent}
              />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {networkState.isConnected ? 'Active' : 'Inactive'}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Connection</Text>
            </GradientCard>
          </View>

          <GradientCard style={styles.featureCard} colors={colors}>
            <View style={styles.featureHeader}>
              <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
              <Text style={[styles.featureTitle, { color: colors.text }]}>Secure Connection</Text>
            </View>
            <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
              Your network connection is monitored and secured by ChelureTech's
              advanced network analysis tools.
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
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.xs,
  },
  mainCard: {
    marginBottom: SPACING.lg,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semiBold,
    color: COLORS.text,
  },
  connectionInfo: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  connectionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 140, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  connectionType: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  ipLabel: {
    fontSize: FONTS.sizes.sm,
    marginBottom: SPACING.xs,
  },
  ipAddress: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    letterSpacing: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.xl,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
  },
  quickActionBtn: {
    alignItems: 'center',
  },
  quickActionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  quickActionLabel: {
    fontSize: FONTS.sizes.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
  featureCard: {
    marginBottom: SPACING.lg,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  featureTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semiBold,
  },
  featureDescription: {
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
  },
});
