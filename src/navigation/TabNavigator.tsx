import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeScreen, NetworkInfoScreen, SettingsScreen } from '../screens';
import { useTheme } from '../context/ThemeContext';
import { FONTS } from '../constants/theme';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
  colors: { primary: string; accent: string; text: string; textMuted: string };
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, name, colors }) => {
  if (focused) {
    return (
      <View style={styles.activeIconContainer}>
        <LinearGradient
          colors={[colors.primary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.activeIconGradient}
        >
          <Ionicons name={name} size={24} color={colors.text} />
        </LinearGradient>
      </View>
    );
  }

  return <Ionicons name={name} size={24} color={colors.textMuted} />;
};

export const TabNavigator: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom + 34;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.backgroundCard,
            borderTopColor: colors.borderColor,
            paddingBottom: bottomPadding,
            height: 56 + bottomPadding,
          },
        ],
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? 'home' : 'home-outline'}
              colors={colors}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Network"
        component={NetworkInfoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? 'globe' : 'globe-outline'}
              colors={colors}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={focused ? 'settings' : 'settings-outline'}
              colors={colors}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  tabBarLabel: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.medium,
    marginTop: 4,
  },
  activeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
