import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'obsidian' | 'luminous';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  applyToRoot?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'obsidian',
  storageKey = 'rd-theme',
  applyToRoot = true,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'obsidian' || saved === 'luminous') return saved;
    }
    return defaultTheme;
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'obsidian' ? 'luminous' : 'obsidian');
  };

  useEffect(() => {
    if (applyToRoot && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, applyToRoot]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div data-theme={theme} style={{ display: 'contents' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
