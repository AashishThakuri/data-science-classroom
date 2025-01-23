import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface AuthFormProps {
  mode: 'signup' | 'signin'
  onSuccess?: () => void
  className?: string
}

export function AuthForm({ mode, onSuccess, className }: AuthFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [faculty, setFaculty] = useState<'dataScience' | 'bioinformatics' | 'computationalMath'>('dataScience')
  const [loading, setLoading] = useState<boolean>(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  if (!auth) {
    throw new Error('Auth context is not available')
  }

  const resendVerification = async () => {
    try {
      setLoading(true)
      const { error } = await auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      toast.success('Verification email resent! Please check your inbox.')
    } catch (error: any) {
      console.error('Resend error:', error)
      toast.error(error.message || 'Failed to resend verification email')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await auth.signUp({
      email,
      password,
      full_name: name,
      faculty: faculty
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success('Signup successful! Please check your email to verify your account.');
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    if (mode === 'signup' && !name.trim()) {
      toast.error('Please enter your full name')
      return
    }

    setLoading(true)

    try {
      if (mode === 'signup') {
        await handleSignUp(e);
        setVerificationSent(true)
        toast.success('Please check your email for verification link')
      } else {
        const { error } = await auth.signIn({
          email,
          password
        })

        if (error) throw error
        
        toast.success('Logged in successfully!')
        navigate('/dashboard')
        if (onSuccess) onSuccess()
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      
      if (error.message.includes('Email not confirmed')) {
        toast.error('Please verify your email before logging in')
        // Show resend button
        setVerificationSent(true)
      } else if (error.message.includes('Invalid login')) {
        toast.error('Invalid email or password')
      } else {
        toast.error(error.message || 'An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('space-y-4 w-full max-w-sm', className)}>
      {verificationSent ? (
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Verification Email Sent</h3>
          <p>Please check your email to verify your account. You will need to verify your email before logging in.</p>
          <Button
            onClick={resendVerification}
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          <Button
            onClick={() => setVerificationSent(false)}
            variant="outline"
            className="w-full"
          >
            Back to {mode === 'signup' ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
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

          <div className="space-y-2">
            <Label>Faculty</Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="faculty"
                  value="dataScience"
                  checked={faculty === 'dataScience'}
                  onChange={(e) => setFaculty(e.target.value as 'dataScience' | 'bioinformatics' | 'computationalMath')}
                  className="h-4 w-4"
                />
                <span>Data Science</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="faculty"
                  value="bioinformatics"
                  checked={faculty === 'bioinformatics'}
                  onChange={(e) => setFaculty(e.target.value as 'dataScience' | 'bioinformatics' | 'computationalMath')}
                  className="h-4 w-4"
                />
                <span>Bioinformatics</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="faculty"
                  value="computationalMath"
                  checked={faculty === 'computationalMath'}
                  onChange={(e) => setFaculty(e.target.value as 'dataScience' | 'bioinformatics' | 'computationalMath')}
                  className="h-4 w-4"
                />
                <span>Computational Mathematics</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <span>Loading...</span>
            ) : mode === 'signup' ? (
              'Sign Up'
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
