import { useState, useEffect, useRef, useContext, createContext } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/contexts/auth-context';

type Theme = 'light' | 'dark' | 'system';

export interface UserSettings {
  dark_mode: boolean;
  notifications_enabled: boolean;
  two_factor_enabled: boolean;
  system_theme_preference: boolean;
}

// Helper: Convert DB fields to theme string
export function dbToTheme(dark_mode: boolean, system_theme_preference: boolean): Theme {
  if (system_theme_preference) return 'system';
  if (dark_mode) return 'dark';
  return 'light';
}

// Helper: Convert theme string to DB fields
export function themeToDb(theme: Theme): { dark_mode: boolean; system_theme_preference: boolean } {
  if (theme === 'system') return { dark_mode: false, system_theme_preference: true };
  if (theme === 'dark') return { dark_mode: true, system_theme_preference: false };
  return { dark_mode: false, system_theme_preference: false };
}

// Fetch all user settings from DB
export async function fetchUserSettings(user_id: string): Promise<UserSettings | null> {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', user_id)
    .maybeSingle();
  if (error) return null;
  return data;
}

// Save user theme to DB
export async function saveUserTheme(user_id: string, theme: Theme) {
  const dbFields = themeToDb(theme);
  await supabase.from('user_settings').upsert({
    user_id,
    ...dbFields,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
}

// UserSettingsContext (to be provided by a provider in the app)
export const UserSettingsContext = createContext<{
  userSettings: UserSettings | null;
  setUserSettings: (settings: UserSettings | null) => void;
} | null>(null);

export function useTheme() {
  const { user } = useAuthContext();
  const userSettingsContext = useContext(UserSettingsContext);
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? 'dark' : 'light';
    }
    return theme;
  });

  const lastTheme = useRef<Theme>(theme);

  // Set theme from userSettings when they change
  useEffect(() => {
    if (userSettingsContext?.userSettings) {
      const userTheme = dbToTheme(
        userSettingsContext.userSettings.dark_mode,
        userSettingsContext.userSettings.system_theme_preference
      );
      // Only update if the theme is different
      if (userTheme !== theme) {
        setThemeState(userTheme);
        lastTheme.current = userTheme;
        // Persist to localStorage
        if (userTheme === 'system') {
          localStorage.removeItem('theme');
        } else {
          localStorage.setItem('theme', userTheme);
        }
      }
    }
    // Do NOT reset theme when userSettings becomes null
    // eslint-disable-next-line
  }, [userSettingsContext?.userSettings]);

  // Update resolved theme when system preference changes
  useEffect(() => {
    if (theme !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  // Update resolved theme when theme changes
  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(isDark ? 'dark' : 'light');
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }

    const root = document.documentElement;
    const isDark = resolvedTheme === 'dark';
    
    // Force remove and add instead of toggle
    root.classList.remove('dark');
    if (isDark) {
      root.classList.add('dark');
    }
  }, [theme, resolvedTheme]);

  // Save user theme to DB only if changed and user is present
  useEffect(() => {
    if (user?.id && lastTheme.current !== theme) {
      saveUserTheme(user.id, theme);
      lastTheme.current = theme;
    }
  }, [theme, user?.id]);

  // Set theme and persist
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    // Optionally update userSettingsContext if present
    if (userSettingsContext?.setUserSettings && userSettingsContext.userSettings) {
      userSettingsContext.setUserSettings({
        ...userSettingsContext.userSettings,
        ...themeToDb(newTheme),
      });
    }
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
  };
} 