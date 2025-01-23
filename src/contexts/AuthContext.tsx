import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { toast } from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, options?: { data: { full_name: string } }) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error loading auth session:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for changes on auth state (signed in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      })
      
      if (error) throw error
      if (data?.user) {
        setUser(data.user)
        toast.success('Signed in successfully!')
      }
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const signUp = async (email: string, password: string, options?: { data: { full_name: string } }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          ...options,
          emailRedirectTo: window.location.origin + '/app/dashboard'
        }
      })
      
      if (error) throw error
      if (data?.user) {
        setUser(data.user)
        toast.success('Account created successfully!')
      }
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      toast.success('Signed out successfully!')
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
