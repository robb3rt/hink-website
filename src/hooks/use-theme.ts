import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    const savedTheme = localStorage.getItem('theme') as Theme;
    console.log('Initial theme from localStorage:', savedTheme);
    return savedTheme || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('Initial system theme:', isDark ? 'dark' : 'light');
      return isDark ? 'dark' : 'light';
    }
    return theme;
  });

  // Update resolved theme when system preference changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      console.log('System theme changed:', e.matches ? 'dark' : 'light');
      setResolvedTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  // Update resolved theme when theme changes
  useEffect(() => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('Updating resolved theme from system:', isDark ? 'dark' : 'light');
      setResolvedTheme(isDark ? 'dark' : 'light');
    } else {
      console.log('Updating resolved theme from selection:', theme);
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    console.log('Theme changed:', { theme, resolvedTheme });
    
    if (theme === 'system') {
      console.log('Removing theme from localStorage');
      localStorage.removeItem('theme');
    } else {
      console.log('Saving theme to localStorage:', theme);
      localStorage.setItem('theme', theme);
    }

    const root = document.documentElement;
    const isDark = resolvedTheme === 'dark';
    console.log('Toggling dark class:', isDark);
    
    // Force remove and add instead of toggle
    root.classList.remove('dark');
    if (isDark) {
      root.classList.add('dark');
    }
    
    // Log final state
    console.log('Dark class present:', root.classList.contains('dark'));
  }, [theme, resolvedTheme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
  };
} 