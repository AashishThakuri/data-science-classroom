-- Add faculty column to profiles table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'faculty'
    ) THEN
        ALTER TABLE public.profiles
        ADD COLUMN faculty TEXT CHECK (faculty IN ('data_science', 'bioinformatics'));
    END IF;
END $$;
