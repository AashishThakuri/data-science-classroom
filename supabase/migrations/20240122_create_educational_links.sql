-- Create table for educational links
create table if not exists public.educational_links (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    url text not null,
    description text,
    class_level text not null, -- e.g., 'Class 8', 'Class 9', 'Bachelor'
    subject text not null,
    subject_image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.educational_links enable row level security;

-- Allow all authenticated users to view links
create policy "Allow all users to view educational links"
    on public.educational_links
    for select
    to authenticated
    using (true);

-- Only allow admins to insert/update/delete links
create policy "Allow admins to manage educational links"
    on public.educational_links
    for all
    to authenticated
    using (auth.jwt() ->> 'role' = 'admin');

-- Insert some sample educational links for Nepal's curriculum
INSERT INTO public.educational_links (title, url, description, class_level, subject, subject_image_url) VALUES
-- Class 8
('Class 8 Science Notes', 'https://www.kullabs.com/classes/subjects/science/class-8', 'Complete science notes for class 8 Nepal curriculum', 'Class 8', 'Science', 'https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg'),
('Class 8 Mathematics', 'https://www.kullabs.com/classes/subjects/mathematics/class-8', 'Mathematics notes and exercises for class 8', 'Class 8', 'Mathematics', 'https://img.freepik.com/free-vector/hand-drawn-mathematics-background_23-2148157867.jpg'),
('Class 8 Social Studies', 'https://www.kullabs.com/classes/subjects/social-studies/class-8', 'Social studies materials for class 8', 'Class 8', 'Social Studies', 'https://img.freepik.com/free-vector/hand-drawn-social-studies-illustration_23-2150260732.jpg'),

-- Class 9
('Class 9 Science', 'https://www.sajilokitab.com/class-9/science', 'Science notes and resources for class 9', 'Class 9', 'Science', 'https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg'),
('Class 9 Mathematics', 'https://www.sajilokitab.com/class-9/mathematics', 'Complete mathematics guide for class 9', 'Class 9', 'Mathematics', 'https://img.freepik.com/free-vector/hand-drawn-mathematics-background_23-2148157867.jpg'),
('Class 9 English', 'https://www.sajilokitab.com/class-9/english', 'English language resources and exercises', 'Class 9', 'English', 'https://img.freepik.com/free-vector/hand-drawn-english-book-background_23-2149483336.jpg'),

-- Class 10
('Class 10 Science Notes', 'https://www.kullabs.com/classes/subjects/science/class-10', 'SEE preparation science notes', 'Class 10', 'Science', 'https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg'),
('Class 10 Mathematics', 'https://www.kullabs.com/classes/subjects/mathematics/class-10', 'SEE level mathematics complete guide', 'Class 10', 'Mathematics', 'https://img.freepik.com/free-vector/hand-drawn-mathematics-background_23-2148157867.jpg'),
('Class 10 Nepali', 'https://www.kullabs.com/classes/subjects/nepali/class-10', 'Nepali subject materials for SEE', 'Class 10', 'Nepali', 'https://img.freepik.com/free-vector/hand-drawn-literature-background_23-2149483338.jpg'),

-- Class 11
('Class 11 Physics', 'https://www.educatenepal.com/class-11/physics', 'Complete physics notes for class 11', 'Class 11', 'Physics', 'https://img.freepik.com/free-vector/hand-drawn-physics-background_23-2148157868.jpg'),
('Class 11 Chemistry', 'https://www.educatenepal.com/class-11/chemistry', 'Chemistry notes and practical guides', 'Class 11', 'Chemistry', 'https://img.freepik.com/free-vector/hand-drawn-chemistry-background_23-2148157866.jpg'),
('Class 11 Biology', 'https://www.educatenepal.com/class-11/biology', 'Biology complete course materials', 'Class 11', 'Biology', 'https://img.freepik.com/free-vector/hand-drawn-biology-background_23-2148157869.jpg'),

-- Class 12
('Class 12 Physics', 'https://www.educatenepal.com/class-12/physics', 'Physics notes and numerical problems', 'Class 12', 'Physics', 'https://img.freepik.com/free-vector/hand-drawn-physics-background_23-2148157868.jpg'),
('Class 12 Chemistry', 'https://www.educatenepal.com/class-12/chemistry', 'Complete chemistry guide with solutions', 'Class 12', 'Chemistry', 'https://img.freepik.com/free-vector/hand-drawn-chemistry-background_23-2148157866.jpg'),
('Class 12 Computer Science', 'https://www.educatenepal.com/class-12/computer-science', 'Computer science notes and practicals', 'Class 12', 'Computer Science', 'https://img.freepik.com/free-vector/hand-drawn-computer-science-background_23-2148157870.jpg');
