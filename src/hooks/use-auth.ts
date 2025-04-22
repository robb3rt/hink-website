import { useState, useEffect } from 'react'
import { createClient, User, Session } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: Error | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error

        if (mounted) {
          setAuthState({
            user: session?.user ?? null,
            session,
            loading: false,
            error: null
          })
        }
      } catch (error) {
        if (mounted) {
          setAuthState(state => ({
            ...state,
            error: error as Error,
            loading: false
          }))
        }
      }
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          error: null
        })
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return authState
}

// Export supabase client for direct usage
export { supabase } 