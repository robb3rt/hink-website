import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

/**
 * ResetPassword component provides the interface and functionality for users
 * to reset their password after receiving a recovery link. It validates the
 * recovery token, handles form submission, and manages the password update
 * process through Supabase.
 */
export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Check if we have a recovery token
        const recoveryToken = sessionStorage.getItem('sb-recovery-token')
        if (!recoveryToken) {
          console.error('No recovery token found in session storage')
          setError('Invalid password reset link. Please request a new one.')
          await supabase.auth.signOut()
          return
        }

        // Set the recovery token as the session
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: recoveryToken,
          refresh_token: sessionStorage.getItem('sb-refresh-token') || '',
        })

        if (sessionError) {
          console.error('Failed to set session:', sessionError)
          setError('Invalid or expired reset link. Please request a new one.')
          await supabase.auth.signOut()
          return
        }

        // Verify the session is valid
        const { data: { session }, error: getSessionError } = await supabase.auth.getSession()
        if (getSessionError || !session) {
          console.error('Invalid session:', getSessionError)
          setError('Invalid or expired reset link. Please request a new one.')
          await supabase.auth.signOut()
          return
        }
      } catch (error) {
        console.error('Session validation error:', error)
        setError('An error occurred. Please try again.')
        await supabase.auth.signOut()
      }
    }

    validateSession()
  }, [])

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      // Verify session is still valid before updating password
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError || !session) {
        throw new Error('Your session has expired. Please request a new reset link.')
      }

      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      // Clear the recovery tokens
      sessionStorage.removeItem('sb-recovery-token')
      sessionStorage.removeItem('sb-refresh-token')

      setMessage('Password updated successfully! You can now sign in with your new password.')

      // Sign out and redirect to home after a short delay
      setTimeout(async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
      }, 3000)
    } catch (error: any) {
      console.error('Password reset error:', error)
      setError(error.message || 'An error occurred while resetting your password')
      if (error.message.includes('session')) {
        await supabase.auth.signOut()
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your new password below
          </p>
        </div>

        <form onSubmit={handlePasswordReset} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Confirm your new password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {message && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-700">{message}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  )
} 