import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { User, AuthError } from '@supabase/supabase-js'

interface SignUpParams {
  email: string
  password: string
  full_name: string
  role: 'teacher' | 'student'
  faculty: 'data_science' | 'bioinformatics'
}

interface SignInParams {
  email: string
  password: string
  role?: 'teacher' | 'student'
}

export interface AuthContextType {
  user: User | null
  userRole: 'teacher' | 'student' | null
  signUp: (params: SignUpParams) => Promise<{ user: User | null; error: AuthError | null }>
  signIn: (params: SignInParams) => Promise<{ user: User | null; error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resend: (params: { type: 'signup', email: string, options?: { emailRedirectTo?: string } }) => Promise<{ error: AuthError | null }>
  loading: boolean
}

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<'teacher' | 'student' | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserRole = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return profile?.role ?? null;
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return null;
    }
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const role = await fetchUserRole(session.user.id);
          setUserRole(role);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error getting session:', error)
        setUser(null)
        setUserRole(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const role = await fetchUserRole(session.user.id);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async ({ email, password, full_name, role, faculty }: SignUpParams) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            role,
            faculty
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned after signup');

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            full_name,
            role,
            faculty,
            email
          }
        ]);

      if (profileError) {
        console.error('Error creating profile:', profileError);
        throw profileError;
      }

      setUserRole(role);
      return { user: authData.user, error: null };
    } catch (error: any) {
      console.error('Error in signUp:', error);
      return { user: null, error };
    }
  }

  const signIn = async ({ email, password }: SignInParams) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned after signin');

      const role = await fetchUserRole(authData.user.id);
      setUserRole(role);

      return { user: authData.user, error: null };
    } catch (error: any) {
      console.error('Error in signIn:', error);
      return { user: null, error };
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setUserRole(null);
      
      return { error: null };
    } catch (error: any) {
      console.error('Error in signOut:', error);
      return { error };
    }
  }

  const resend = async ({ type, email, options = {} }: { type: 'signup', email: string, options?: { emailRedirectTo?: string } }) => {
    try {
      const { error } = await supabase.auth.resend({
        type,
        email,
        options
      });

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Error in resend:', error);
      return { error };
    }
  }

  return {
    user,
    userRole,
    signUp,
    signIn,
    signOut,
    resend,
    loading
  }
}
