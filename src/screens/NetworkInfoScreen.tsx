import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Network from 'expo-network';
import * as Device from 'expo-device';
import { GradientCard, InfoRow } from '../components';
import { useTheme } from '../context/ThemeContext';
import { FONTS, SPACING } from '../constants/theme';

type DeviceInfo = {
  brand: string | null;
  modelName: string | null;
  osName: string | null;
  osVersion: string | null;
  deviceName: string | null;
};

type NetworkInfo = {
  ipAddress: string;
  type: string;
  isAirplaneMode: boolean;
};

export const NetworkInfoScreen: React.FC = () => {
  const { colors } = useTheme();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    brand: null,
    modelName: null,
    osName: null,
    osVersion: null,
    deviceName: null,
  });
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    ipAddress: 'Loading...',
    type: 'Unknown',
    isAirplaneMode: false,
  });
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    fetchAllInfo();
  }, []);

  const fetchAllInfo = async () => {
    setDeviceInfo({
      brand: Device.brand,
      modelName: Device.modelName,
      osName: Device.osName,
      osVersion: Device.osVersion,
      deviceName: Device.deviceName,
    });

    try {
      const ip = await Network.getIpAddressAsync();
      const state = await Network.getNetworkStateAsync();
      const airplaneMode = await Network.isAirplaneModeEnabledAsync();

      setNetworkInfo({
        ipAddress: ip,
        type: state.type ?? 'Unknown',
        isAirplaneMode: airplaneMode,
      });
    } catch (error) {
      console.log('Error fetching network info:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllInfo();
    setRefreshing(false);
  };

  const getConnectionIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
      WIFI: 'wifi',
      CELLULAR: 'cellular',
      ETHERNET: 'git-network-outline',
      BLUETOOTH: 'bluetooth',
      VPN: 'shield-outline',
      UNKNOWN: 'help-circle-outline',
      NONE: 'close-circle-outline',
    };
    return icons[type] || 'globe-outline';
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundLight]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.header}>
            <Ionicons name="information-circle" size={32} color={colors.accent} />
            <Text style={[styles.title, { color: colors.text }]}>Network Info</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Device & Connection Details
            </Text>
          </View>

          <GradientCard style={styles.card} colors={colors}>
            <View style={[styles.sectionHeader, { borderBottomColor: colors.borderColorLight }]}>
              <Ionicons name="globe-outline" size={24} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Connection Details</Text>
            </View>
            <InfoRow
              icon={getConnectionIcon(networkInfo.type)}
              label="Connection Type"
              value={networkInfo.type}
              iconColor={colors.accent}
              colors={colors}
            />
            <InfoRow
              icon="location-outline"
              label="IP Address"
              value={networkInfo.ipAddress}
              iconColor={colors.primary}
              colors={colors}
            />
            <InfoRow
              icon="airplane-outline"
              label="Airplane Mode"
              value={networkInfo.isAirplaneMode ? 'Enabled' : 'Disabled'}
              iconColor={networkInfo.isAirplaneMode ? colors.warning : colors.success}
              colors={colors}
            />
          </GradientCard>

          <GradientCard style={styles.card} colors={colors}>
            <View style={[styles.sectionHeader, { borderBottomColor: colors.borderColorLight }]}>
              <Ionicons name="phone-portrait-outline" size={24} color={colors.accent} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Device Information</Text>
            </View>
            <InfoRow
              icon="hardware-chip-outline"
              label="Brand"
              value={deviceInfo.brand ?? 'Unknown'}
              iconColor={colors.accent}
              colors={colors}
            />
            <InfoRow
              icon="phone-portrait-outline"
              label="Model"
              value={deviceInfo.modelName ?? 'Unknown'}
              iconColor={colors.primary}
              colors={colors}
            />
            <InfoRow
              icon="logo-apple"
              label="Operating System"
              value={`${deviceInfo.osName ?? 'Unknown'} ${deviceInfo.osVersion ?? ''}`}
              iconColor={colors.accent}
              colors={colors}
            />
            <InfoRow
              icon="text-outline"
              label="Device Name"
              value={deviceInfo.deviceName ?? 'Unknown'}
              iconColor={colors.primary}
              colors={colors}
            />
          </GradientCard>

          <GradientCard style={styles.infoCard} colors={colors}>
            <View style={styles.infoContent}>
              <Ionicons name="shield-checkmark" size={40} color={colors.success} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoTitle, { color: colors.text }]}>Secure Connection</Text>
                <Text style={[styles.infoDescription, { color: colors.textSecondary }]}>
                  Your device information is secure and not shared with any third parties.
                </Text>
              </View>
            </View>
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semiBold,
  },
  infoCard: {
    marginBottom: SPACING.lg,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semiBold,
    marginBottom: SPACING.xs,
  },
  infoDescription: {
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
});
