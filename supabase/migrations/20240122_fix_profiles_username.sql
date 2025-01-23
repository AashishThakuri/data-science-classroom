-- Add username column and make it nullable
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS username TEXT;

-- Update the handle_new_user function to include default values
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        role,
        faculty,
        username,
        full_name,
        class_name
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
        COALESCE(NEW.raw_user_meta_data->>'faculty', 'data_science'),
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'class_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
