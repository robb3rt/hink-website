import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from '@/contexts/auth-context'
import { UserSettingsContext, fetchUserSettings, UserSettings } from '@/hooks/use-theme'
import { SupabaseProvider } from '@/lib/supabase'
import { useAuthContext } from '@/contexts/auth-context';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

// Lazy load components
const AuthCallback = lazy(() => import("@/components/auth/flows/AuthCallback"));
const ResetPassword = lazy(() => import("@/components/auth/flows/ResetPassword"));
const SignOut = lazy(() => import("@/components/auth/flows/SignOut"));
const DashboardLayout = lazy(() => import("@/app/dashboard/layout"));
const DashboardPage = lazy(() => import("@/app/dashboard/page"));
const ThemeInitializer = lazy(() => import("@/components/theme-initializer"));

// Loading component for Suspense
function LoadingFallback() {
  return <div className="min-h-screen bg-white dark:bg-background" />;
}

// Error Boundary
class AppErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // Log error
    console.error('App error boundary:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="min-h-screen flex items-center justify-center text-red-600">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <SupabaseProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppErrorBoundary>
            <UserSettingsProvider>
              <Suspense fallback={<LoadingFallback />}>
                <ThemeInitializer />
                <Routes>
                  {/* Auth routes */}
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/logout" element={<SignOut />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    {/* Add more dashboard routes here */}
                  </Route>
                </Routes>
              </Suspense>
            </UserSettingsProvider>
          </AppErrorBoundary>
        </AuthProvider>
      </BrowserRouter>
    </SupabaseProvider>
  );
}

// Default export for root component
export default App;

// UserSettingsProvider fetches user settings on sign-in and provides them via context
function UserSettingsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const lastUserId = useRef<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const userId = user?.id ?? null;

    if (userId === lastUserId.current) {
      return;
    }

    lastUserId.current = userId;

    async function fetchSettings() {
      if (userId) {
        const settings = await fetchUserSettings(userId);
        if (!ignore) setUserSettings(settings);
      } else {
        setUserSettings(null);
      }
    }

    const timeoutId = setTimeout(fetchSettings, 100);
    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [user?.id]);

  return (
    <UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
}
