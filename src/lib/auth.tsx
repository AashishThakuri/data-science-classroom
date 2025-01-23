import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  signIn: (credentials: { email: string; password: string }) => Promise<void>
  signUp: (credentials: { email: string; password: string; options?: { data: { full_name: string } } }) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => {},
  signUp: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === 'SIGNED_OUT') {
        navigate('/')
      } else if (event === 'SIGNED_IN') {
        navigate('/app/dashboard')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async ({ email, password, options }: { email: string; password: string; options?: { data: { full_name: string } } }) => {
    const { error } = await supabase.auth.signUp({ email, password, options })
    if (error) throw error
  }

  const value = {
    user,
    loading,
    signOut,
    signIn,
    signUp,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
