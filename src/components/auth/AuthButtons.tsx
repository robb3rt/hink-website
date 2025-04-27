import { Button } from '@/components/ui/button'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Get the current base URL based on environment
const getSiteUrl = () => {
  return import.meta.env.VITE_SITE_URL || window.location.origin
}

export interface AuthButtonsProps {
  onAuthStateChange?: (event: 'SIGNED_IN' | 'SIGNED_OUT', session: any) => void
  className?: string
}

export function AuthButtons({ onAuthStateChange, className }: AuthButtonsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isResetPassword, setIsResetPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)
    setShowConfirmation(false)

    try {
      if (isResetPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${getSiteUrl()}/auth/callback?next=/reset-password`,
        })
        if (error) throw error
        setMessage('Check your email for the password reset link')
      } else {
        const { data, error } = isSignUp || showSignUpModal
          ? await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${getSiteUrl()}/auth/callback`,
              }
            })
          : await supabase.auth.signInWithPassword({
              email,
              password
            })

        if (error) throw error
        
        if (isSignUp || showSignUpModal) {
          if (data?.user?.identities?.length === 0) {
            throw new Error('This email is already registered. Please sign in instead.')
          }
          setShowConfirmation(true)
          setMessage('Please check your email to confirm your account.')
        } else if (data?.session) {
          onAuthStateChange?.('SIGNED_IN', data.session)
        }
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError('')
    setMessage('')
    setIsResetPassword(false)
    setIsSignUp(false)
    setShowConfirmation(false)
  }

  const switchToLogin = () => {
    resetForm()
    setShowSignUpModal(false)
    setShowLoginModal(true)
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Dialog.Root open={showLoginModal} onOpenChange={setShowLoginModal}>
        <Dialog.Trigger asChild>
          <Button variant="outline" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Log In'}
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            {showConfirmation ? (
              <>
                <Dialog.Title className="text-lg font-semibold">
                  Verify Your Email
                </Dialog.Title>
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm text-blue-700">
                      We've sent a verification email to <strong>{email}</strong>
                    </p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-blue-700">
                      <li>Click the link in the email to verify your account</li>
                      <li>Check your spam folder if you don't see the email</li>
                      <li>The link will expire in 24 hours</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Once verified, you can sign in to access your account.
                  </p>
                  <Dialog.Close asChild>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        const confirmedEmail = email;
                        resetForm();
                        setEmail(confirmedEmail);
                        setShowSignUpModal(false);
                        setShowLoginModal(true);
                      }}
                    >
                      Continue to Log In
                    </Button>
                  </Dialog.Close>
                </div>
              </>
            ) : (
              <>
                <Dialog.Title className="text-lg font-semibold">
                  {isResetPassword 
                    ? 'Reset Password'
                    : isSignUp 
                      ? 'Create an Account' 
                      : 'Welcome Back'}
                </Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground">
                  {isResetPassword
                    ? 'Enter your email to receive a password reset link'
                    : isSignUp
                      ? 'Sign up for an account to get started'
                      : 'Sign in to your account'}
                </Dialog.Description>
                
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  {!isResetPassword && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  {message && (
                    <p className="text-sm text-green-500">{message}</p>
                  )}

                  <div className="flex flex-col gap-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading
                        ? 'Loading...'
                        : isResetPassword
                          ? 'Send Reset Link'
                          : isSignUp
                            ? 'Sign Up'
                            : 'Sign In'}
                    </Button>

                    {!isResetPassword && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setIsSignUp(!isSignUp)
                          setError('')
                        }}
                      >
                        {isSignUp
                          ? 'Already have an account? Sign In'
                          : "Don't have an account? Sign Up"}
                      </Button>
                    )}

                    {!isSignUp && !isResetPassword && (
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm"
                        onClick={() => {
                          setIsResetPassword(true)
                          setError('')
                        }}
                      >
                        Forgot your password?
                      </Button>
                    )}

                    {isResetPassword && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setIsResetPassword(false)
                          setError('')
                        }}
                      >
                        Back to Sign In
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={showSignUpModal} onOpenChange={setShowSignUpModal}>
        <Dialog.Trigger asChild>
          <Button variant="default" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign Up'}
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            {showConfirmation ? (
              <>
                <Dialog.Title className="text-lg font-semibold">
                  Verify Your Email
                </Dialog.Title>
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm text-blue-700">
                      We've sent a verification email to <strong>{email}</strong>
                    </p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-blue-700">
                      <li>Click the link in the email to verify your account</li>
                      <li>Check your spam folder if you don't see the email</li>
                      <li>The link will expire in 24 hours</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Once verified, you can sign in to access your account.
                  </p>
                  <Dialog.Close asChild>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        const confirmedEmail = email;
                        resetForm();
                        setEmail(confirmedEmail);
                        setShowSignUpModal(false);
                        setShowLoginModal(true);
                      }}
                    >
                      Continue to Log In
                    </Button>
                  </Dialog.Close>
                </div>
              </>
            ) : (
              <>
                <Dialog.Title className="text-lg font-semibold">Create an Account</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground">
                  Sign up for an account to get started
                </Dialog.Description>
                
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  {message && (
                    <p className="text-sm text-green-500">{message}</p>
                  )}

                  <div className="flex flex-col gap-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Sign Up'}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={switchToLogin}
                    >
                      Already have an account? Sign In
                    </Button>
                  </div>
                </form>
              </>
            )}

            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
} 