import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

/**
 * SignOut component handles the logout flow.
 * It automatically signs out the user and redirects to the home page.
 */
export function SignOut() {
  useEffect(() => {
    const handleSignOut = async () => {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        console.error('Error signing out:', error)
      } finally {
        // Always redirect to home, even if there was an error
        window.location.href = '/'
      }
    }

    handleSignOut()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-lg font-semibold">Signing out...</h2>
        <p className="text-sm text-gray-600">Please wait while we sign you out.</p>
      </div>
    </div>
  )
}

// Default export for lazy loading
export default SignOut; 