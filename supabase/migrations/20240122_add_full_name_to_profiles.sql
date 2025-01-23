-- Add full_name column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);

-- Update the handle_new_user function to include full_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
