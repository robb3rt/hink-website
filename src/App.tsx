import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from '@/contexts/auth-context'
import { useTheme } from '@/hooks/use-theme'

// Lazy load pages
const AuthCallback = lazy(() => import("@/components/auth/flows/AuthCallback"));
const ResetPassword = lazy(() => import("@/components/auth/flows/ResetPassword"));
const SignOut = lazy(() => import("@/components/auth/flows/SignOut"));
const Dashboard = lazy(() => import("@/app/dashboard/page"));

// Loading component for Suspense
function LoadingFallback() {
  return <div className="min-h-screen bg-white dark:bg-background" />;
}

export default function App() {
  // Initialize theme hook at the root level
  useTheme();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Auth routes */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/logout" element={<SignOut />} />
            
            {/* Main app route */}
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
