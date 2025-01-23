-- Drop existing tables and policies
DROP TABLE IF EXISTS classroom_students CASCADE;
DROP TABLE IF EXISTS classrooms CASCADE;

-- Create classrooms table
CREATE TABLE classrooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    teacher_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create classroom_students table
CREATE TABLE classroom_students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(classroom_id, student_id)
);

-- Enable RLS
ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE classroom_students ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Teachers can create classrooms" ON classrooms;
DROP POLICY IF EXISTS "Users can view classrooms" ON classrooms;
DROP POLICY IF EXISTS "Teachers can update own classrooms" ON classrooms;
DROP POLICY IF EXISTS "Teachers can delete own classrooms" ON classrooms;
DROP POLICY IF EXISTS "Students view enrollments" ON classroom_students;
DROP POLICY IF EXISTS "Teachers manage enrollments" ON classroom_students;

-- Create a single policy for teachers on classrooms
CREATE POLICY "teacher_all_access" ON classrooms
    TO authenticated
    USING (
        -- For SELECT, allow if teacher owns the classroom
        (teacher_id = auth.uid()) OR
        -- For INSERT/UPDATE/DELETE, check if user is a teacher
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'teacher'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'teacher'
        )
    );

-- Create a separate read-only policy for students
CREATE POLICY "student_read_access" ON classrooms
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM classroom_students
            WHERE classroom_students.classroom_id = id
            AND classroom_students.student_id = auth.uid()
        )
    );

-- Simple policies for classroom_students
CREATE POLICY "teacher_manage_enrollments" ON classroom_students
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'teacher'
        )
    );

CREATE POLICY "student_view_enrollments" ON classroom_students
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING (
    auth.uid() = id
);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create policy for public profile viewing
CREATE POLICY "Profiles are viewable by everyone"
ON profiles FOR SELECT
TO authenticated
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_classrooms_updated_at ON classrooms;
CREATE TRIGGER update_classrooms_updated_at
    BEFORE UPDATE ON classrooms
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
