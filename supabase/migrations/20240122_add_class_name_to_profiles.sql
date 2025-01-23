-- Add class_name column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS class_name VARCHAR(100);

-- Update RLS policies
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Create an index on class_name for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_class_name ON public.profiles(class_name);
