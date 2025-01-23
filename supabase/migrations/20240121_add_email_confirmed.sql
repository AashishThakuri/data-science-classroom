-- Add email_confirmed column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email_confirmed BOOLEAN DEFAULT false;

-- Update existing rows to have email_confirmed set to true
-- since they were created before this column existed
UPDATE public.profiles SET email_confirmed = true;
