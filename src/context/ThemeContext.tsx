import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { DARK_COLORS, LIGHT_COLORS, type ColorScheme } from '../constants/theme';

const THEME_STORAGE_KEY = 'cheluretech_theme';

type ThemeContextType = {
  isDarkMode: boolean;
  colors: ColorScheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const isAvailable = await SecureStore.isAvailableAsync();
        if (isAvailable) {
          const stored = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
          if (stored !== null) {
            setIsDarkMode(stored === 'dark');
          }
        }
      } catch {
        // Keep default dark mode
      } finally {
        setIsLoaded(true);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) {
        await SecureStore.setItemAsync(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
      }
    } catch {
      // Ignore storage errors
    }
  }, [isDarkMode]);

  const value: ThemeContextType = {
    isDarkMode,
    colors,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
