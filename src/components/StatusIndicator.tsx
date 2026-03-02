import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import { FONTS, SPACING } from '../constants/theme';
import type { ColorScheme } from '../constants/theme';

type StatusIndicatorProps = {
  isConnected: boolean;
  label?: string;
  colors?: ColorScheme;
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isConnected,
  label,
  colors,
}) => {
  const successColor = colors?.success ?? '#4ADE80';
  const errorColor = colors?.error ?? '#F87171';
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    if (isConnected) {
      pulse.start();
    }

    return () => pulse.stop();
  }, [isConnected, pulseAnim]);

  const color = isConnected ? successColor : errorColor;

  return (
    <View style={styles.container}>
      <View style={styles.indicatorWrapper}>
        <Animated.View
          style={[
            styles.pulse,
            {
              backgroundColor: color,
              opacity: 0.3,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
        <View style={[styles.dot, { backgroundColor: color }]} />
      </View>
      {label && (
        <Text style={[styles.label, { color }]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  indicatorWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  label: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semiBold,
  },
});
