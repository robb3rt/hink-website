import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

/**
 * AuthCallback component handles the authentication callback flow from Supabase.
 * It processes authentication tokens from the URL and manages redirects based on
 * the authentication type (recovery or standard auth).
 */
export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')
        const next = new URLSearchParams(window.location.search).get('next')

        console.log('Auth callback params:', { type, hasAccessToken: !!accessToken, hasRefreshToken: !!refreshToken })

        if (accessToken && type === 'recovery') {
          // Store tokens temporarily
          sessionStorage.setItem('sb-recovery-token', accessToken)
          sessionStorage.setItem('sb-refresh-token', refreshToken || '')
          
          // Set the session immediately to validate it works
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          })

          if (sessionError) {
            console.error('Failed to set session:', sessionError)
            await supabase.auth.signOut()
            window.location.href = '/'
            return
          }

          // Verify we can get the session
          const { data: { session }, error: getSessionError } = await supabase.auth.getSession()
          
          if (getSessionError || !session) {
            console.error('Failed to verify session:', getSessionError)
            await supabase.auth.signOut()
            window.location.href = '/'
            return
          }

          // Use replace instead of href to preserve the token in the URL
          window.location.replace('/reset-password')
        } else {
          // Handle other auth callbacks (sign up, sign in, etc.)
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('Auth callback error:', error)
            await supabase.auth.signOut()
            window.location.href = '/'
            return
          }

          if (session) {
            // Successfully authenticated
            window.location.href = next || '/'
          } else {
            // No session found, redirect to home
            console.error('No session found after auth callback')
            await supabase.auth.signOut()
            window.location.href = '/'
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        await supabase.auth.signOut()
        window.location.href = '/'
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-lg font-semibold">Processing...</h2>
        <p className="text-sm text-gray-600">Please wait while we complete the authentication.</p>
      </div>
    </div>
  )
} 