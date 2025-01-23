import { createClient } from '@supabase/supabase-js'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export function useSupabase() {
  return useMemo(() => supabase, [])
}

export async function runClassroomMigration() {
  try {
    // Check if profiles table exists and create it if needed
    const { error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profilesError?.code === '42P01') {
      const setupSQL = `
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('teacher', 'student')),
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create classrooms table
CREATE TABLE public.classrooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  teacher_id UUID NOT NULL REFERENCES auth.users(id),
  teacher_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create classroom_teachers table
CREATE TABLE public.classroom_teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  classroom_id UUID NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(classroom_id, teacher_id)
);

-- Enable RLS
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_teachers ENABLE ROW LEVEL SECURITY;

-- Classroom policies
CREATE POLICY "Users can view all classrooms" 
ON public.classrooms FOR SELECT 
USING (true);

CREATE POLICY "Teachers can create classrooms" 
ON public.classrooms FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'teacher'
  )
);

CREATE POLICY "Teachers can update own classrooms" 
ON public.classrooms FOR UPDATE
USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete own classrooms" 
ON public.classrooms FOR DELETE
USING (auth.uid() = teacher_id);

-- Classroom teachers policies
CREATE POLICY "Users can view classroom teachers" 
ON public.classroom_teachers FOR SELECT 
USING (true);

CREATE POLICY "Teachers can manage classroom teachers" 
ON public.classroom_teachers FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.classrooms c 
    WHERE c.id = classroom_teachers.classroom_id 
    AND c.teacher_id = auth.uid()
  )
);

-- Function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, COALESCE(new.raw_user_meta_data->>'role', 'student'));
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
`;
      
      console.log('Please run this SQL in your Supabase dashboard:');
      console.log(setupSQL);
      toast.error('Database setup required. Please contact administrator.');
      return { error: new Error('Database tables not set up') };
    }

    // Check if classroom_teachers table exists
    const { error: teachersCheckError } = await supabase
      .from('classroom_teachers')
      .select('id')
      .limit(1);

    if (teachersCheckError?.code === '42P01') {
      toast.error('Database setup incomplete. Please contact administrator.');
      return { error: new Error('Database tables not fully set up') };
    }

    return { error: null };
  } catch (error: any) {
    console.error('Migration error:', error);
    toast.error('Failed to check database setup. Please try again.');
    return { error };
  }
}
