import { createContext, useContext, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { useAuth } from '@/hooks/use-auth'

interface AuthContextType {
  session: Session | null
  user: User | null
  loading: boolean
  error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {auth.loading ? null : children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protected routes/components
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = null
) {
  return function WithAuthComponent(props: P) {
    const { session, loading } = useAuthContext()
    
    if (loading) return null
    if (!session) return fallback
    
    return <Component {...props} />
  }
} 