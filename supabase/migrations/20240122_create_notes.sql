-- Create enum for education levels
CREATE TYPE education_level AS ENUM ('class_8', 'class_9', 'class_10', 'class_11', 'class_12', 'bachelor');

-- Create notes table
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    education_level education_level NOT NULL,
    faculty TEXT NOT NULL CHECK (faculty IN ('data_science', 'bioinformatics', 'computer_science', 'general')),
    subject TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Notes are viewable by everyone"
    ON public.notes FOR SELECT
    USING (true);

CREATE POLICY "Notes can be inserted by authenticated users"
    ON public.notes FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Notes can be updated by author"
    ON public.notes FOR UPDATE
    USING (auth.uid() = author_id);

CREATE POLICY "Notes can be deleted by author"
    ON public.notes FOR DELETE
    USING (auth.uid() = author_id);

-- Create index for better query performance
CREATE INDEX idx_notes_education_level ON public.notes(education_level);
CREATE INDEX idx_notes_faculty ON public.notes(faculty);
CREATE INDEX idx_notes_subject ON public.notes(subject);
