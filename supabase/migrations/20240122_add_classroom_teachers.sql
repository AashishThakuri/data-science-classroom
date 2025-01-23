-- Create classroom_teachers table if it doesn't exist
CREATE TABLE IF NOT EXISTS classroom_teachers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(classroom_id, teacher_id)
);

-- Enable RLS
ALTER TABLE classroom_teachers ENABLE ROW LEVEL SECURITY;

-- Create policies for classroom_teachers
CREATE POLICY "teachers_manage_collaborators"
ON classroom_teachers
TO authenticated
USING (
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

-- Create policy for teachers to view their collaborations
CREATE POLICY "teachers_view_collaborations"
ON classroom_teachers
FOR SELECT
TO authenticated
USING (
    teacher_id = auth.uid() OR
    EXISTS (
        SELECT 1 FROM classrooms
        WHERE classrooms.id = classroom_teachers.classroom_id
        AND classrooms.teacher_id = auth.uid()
    )
);
