import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabNavigator } from './src/navigation';
import { ThemeProvider, useTheme, AppPreferencesProvider } from './src/context';

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <TabNavigator />
    </>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppPreferencesProvider>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </AppPreferencesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
