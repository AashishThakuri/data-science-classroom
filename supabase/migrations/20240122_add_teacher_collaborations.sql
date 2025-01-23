-- Create classroom_teachers table for teacher collaborations
CREATE TABLE classroom_teachers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(classroom_id, teacher_id)
);

-- Enable RLS
ALTER TABLE classroom_teachers ENABLE ROW LEVEL SECURITY;

-- Policies for classroom_teachers
CREATE POLICY "Teachers can add other teachers"
    ON classroom_teachers
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM classrooms c
            WHERE c.id = classroom_id
            AND c.teacher_id = auth.uid()
        )
    );

CREATE POLICY "Teachers can view their collaborative classrooms"
    ON classroom_teachers
    FOR SELECT
    TO authenticated
    USING (
        (SELECT role FROM auth.users WHERE id = auth.uid()) = 'teacher'
    );

CREATE POLICY "Teachers can remove themselves or be removed by classroom owner"
    ON classroom_teachers
    FOR DELETE
    TO authenticated
    USING (
        teacher_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM classrooms c
            WHERE c.id = classroom_id
            AND c.teacher_id = auth.uid()
        )
    );

-- Modify classroom policies to include collaborating teachers
DROP POLICY IF EXISTS "Teachers can view and edit their classrooms" ON classrooms;
CREATE POLICY "Teachers can view and edit their classrooms"
    ON classrooms
    FOR ALL
    TO authenticated
    USING (
        teacher_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM classroom_teachers ct
            WHERE ct.classroom_id = id
            AND ct.teacher_id = auth.uid()
        )
    )
    WITH CHECK (
        teacher_id = auth.uid()
    );
