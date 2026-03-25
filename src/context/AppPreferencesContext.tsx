import React, { createContext, useContext, useState, type ReactNode } from 'react';

type AppPreferencesContextValue = {
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
};

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

export const AppPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  return (
    <AppPreferencesContext.Provider value={{ autoRefresh, setAutoRefresh }}>
      {children}
    </AppPreferencesContext.Provider>
  );
};

export const useAppPreferences = (): AppPreferencesContextValue => {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error('useAppPreferences must be used within AppPreferencesProvider');
  }
  return ctx;
};
