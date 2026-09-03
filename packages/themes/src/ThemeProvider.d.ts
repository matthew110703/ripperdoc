import React from 'react';
export type Theme = 'obsidian' | 'luminous';
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}
export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    applyToRoot?: boolean;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ThemeContextType;
export {};
