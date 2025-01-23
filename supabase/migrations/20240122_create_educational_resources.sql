-- Create enum for resource types
CREATE TYPE public.resource_type AS ENUM (
    'video',
    'tutorial',
    'document',
    'course',
    'book',
    'article',
    'tool'
);

-- Create table for educational resources
CREATE TABLE public.educational_resources (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    url text NOT NULL,
    description text,
    resource_type resource_type NOT NULL,
    class_level text NOT NULL,
    subject text NOT NULL,
    thumbnail_url text,
    author text,
    platform text,
    language text NOT NULL,
    is_free boolean NOT NULL DEFAULT true,
    rating numeric(3,1) CHECK (rating >= 0 AND rating <= 5),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert sample data for Class 8
INSERT INTO public.educational_resources (title, url, description, resource_type, class_level, subject, thumbnail_url, author, platform, language, is_free, rating) VALUES
-- Mathematics Class 8
('Basic Algebra Introduction', 'https://www.khanacademy.org/math/algebra-basics', 'Learn basic algebra concepts', 'video', 'Class 8', 'Mathematics', 'https://example.com/math1.jpg', 'Khan Academy', 'Khan Academy', 'english', true, 4.8),
('Geometry Fundamentals', 'https://www.mathsisfun.com/geometry/', 'Interactive geometry lessons', 'tutorial', 'Class 8', 'Mathematics', 'https://example.com/math2.jpg', 'Math is Fun', 'Math is Fun', 'english', true, 4.5),
('Math Practice Problems', 'https://www.ixl.com/math/grade-8', 'Practice math problems', 'tool', 'Class 8', 'Mathematics', 'https://example.com/math3.jpg', 'IXL Learning', 'IXL', 'english', false, 4.7),
('Mathematics Textbook Grade 8', 'https://ncert.nic.in/textbook.php', 'Official mathematics textbook', 'book', 'Class 8', 'Mathematics', 'https://example.com/math4.jpg', 'NCERT', 'NCERT', 'english', true, 4.6),
('Math Formula Reference', 'https://mathformulas.net', 'Comprehensive math formula guide', 'document', 'Class 8', 'Mathematics', 'https://example.com/math5.jpg', 'Math Reference', 'Math Reference', 'english', true, 4.4),

-- Science Class 8
('Introduction to Physics', 'https://www.youtube.com/science/physics8', 'Basic physics concepts', 'video', 'Class 8', 'Science', 'https://example.com/science1.jpg', 'Science Guru', 'YouTube', 'english', true, 4.7),
('Chemistry Experiments', 'https://www.sciencebuddy.org/chemistry8', 'Interactive chemistry experiments', 'tutorial', 'Class 8', 'Science', 'https://example.com/science2.jpg', 'Science Buddy', 'Science Buddy', 'english', true, 4.6),
('Biology Study Guide', 'https://www.biologycorner.com/8th/', 'Comprehensive biology guide', 'document', 'Class 8', 'Science', 'https://example.com/science3.jpg', 'Biology Corner', 'Biology Corner', 'english', true, 4.5),
('Science Quiz Platform', 'https://quizizz.com/science8', 'Interactive science quizzes', 'tool', 'Class 8', 'Science', 'https://example.com/science4.jpg', 'Quizizz', 'Quizizz', 'english', false, 4.8),
('Science Textbook', 'https://ncert.nic.in/science8', 'Social studies textbook', 'book', 'Class 8', 'Science', 'https://example.com/science5.jpg', 'NCERT', 'NCERT', 'english', true, 4.7),

-- English Class 8
('English Grammar Course', 'https://www.englishgrammar.org/8th/', 'Complete grammar course', 'course', 'Class 8', 'English', 'https://example.com/english1.jpg', 'English Expert', 'English Grammar', 'english', true, 4.6),
('Vocabulary Builder', 'https://vocabulary.com/8th/', 'Build your vocabulary', 'tool', 'Class 8', 'English', 'https://example.com/english2.jpg', 'Vocabulary.com', 'Vocabulary.com', 'english', false, 4.7),
('Reading Comprehension', 'https://readworks.org/8th/', 'Practice reading comprehension', 'tutorial', 'Class 8', 'English', 'https://example.com/english3.jpg', 'ReadWorks', 'ReadWorks', 'english', true, 4.5),
('Writing Skills', 'https://writeathome.com/8th/', 'Improve writing skills', 'course', 'Class 8', 'English', 'https://example.com/english4.jpg', 'Write at Home', 'Write at Home', 'english', false, 4.8),
('English Literature', 'https://ncert.nic.in/english8', 'English literature textbook', 'book', 'Class 8', 'English', 'https://example.com/english5.jpg', 'NCERT', 'NCERT', 'english', true, 4.6),

-- Social Studies Class 8
('World History', 'https://www.historyforkids.net/8th/', 'Learn world history', 'video', 'Class 8', 'Social Studies', 'https://example.com/social1.jpg', 'History for Kids', 'History for Kids', 'english', true, 4.7),
('Geography Interactive Maps', 'https://www.geographymap.com/8th/', 'Interactive geography maps', 'tool', 'Class 8', 'Social Studies', 'https://example.com/social2.jpg', 'Geography Map', 'Geography Map', 'english', false, 4.6),
('Civics Study Guide', 'https://www.civicsguide.com/8th/', 'Learn about civics', 'document', 'Class 8', 'Social Studies', 'https://example.com/social3.jpg', 'Civics Guide', 'Civics Guide', 'english', true, 4.5),
('Economics Basics', 'https://www.economicsforkids.com/8th/', 'Basic economics concepts', 'tutorial', 'Class 8', 'Social Studies', 'https://example.com/social4.jpg', 'Economics for Kids', 'Economics for Kids', 'english', true, 4.7),
('Social Studies Textbook', 'https://ncert.nic.in/social8', 'Social studies textbook', 'book', 'Class 8', 'Social Studies', 'https://example.com/social5.jpg', 'NCERT', 'NCERT', 'english', true, 4.6),

-- Nepali Class 8
('नेपाली व्याकरण', 'https://www.hamropatro.com/nepali8', 'नेपाली व्याकरण सिक्नुहोस्', 'video', 'Class 8', 'Nepali', 'https://example.com/nepali1.jpg', 'Hamro Patro', 'Hamro Patro', 'nepali', true, 4.8),
('नेपाली साहित्य', 'https://www.nepalilibrary.com/8th/', 'नेपाली साहित्य अध्ययन', 'document', 'Class 8', 'Nepali', 'https://example.com/nepali2.jpg', 'Nepali Library', 'Nepali Library', 'nepali', true, 4.7),
('नेपाली लेखन कला', 'https://www.nepaliwriting.com/8th/', 'नेपाली लेखन सीप', 'tutorial', 'Class 8', 'Nepali', 'https://example.com/nepali3.jpg', 'Nepali Writing', 'Nepali Writing', 'nepali', true, 4.6),
('नेपाली पाठ्यपुस्तक', 'https://ncert.nic.in/nepali8', 'नेपाली पाठ्यपुस्तक', 'book', 'Class 8', 'Nepali', 'https://example.com/nepali4.jpg', 'NCERT', 'NCERT', 'nepali', true, 4.7),
('नेपाली अभ्यास', 'https://www.nepalipractice.com/8th/', 'नेपाली भाषा अभ्यास', 'tool', 'Class 8', 'Nepali', 'https://example.com/nepali5.jpg', 'Nepali Practice', 'Nepali Practice', 'nepali', false, 4.5);

-- Insert sample data for Class 9
INSERT INTO public.educational_resources (title, url, description, resource_type, class_level, subject, thumbnail_url, author, platform, language, is_free, rating) VALUES
-- Mathematics Class 9
('Advanced Algebra', 'https://www.khanacademy.org/math/algebra-advanced', 'Advanced algebra concepts', 'video', 'Class 9', 'Mathematics', 'https://example.com/math9-1.jpg', 'Khan Academy', 'Khan Academy', 'english', true, 4.8),
('Trigonometry Basics', 'https://www.mathsisfun.com/trigonometry/', 'Learn basic trigonometry', 'tutorial', 'Class 9', 'Mathematics', 'https://example.com/math9-2.jpg', 'Math is Fun', 'Math is Fun', 'english', true, 4.7),
('Math Problem Solver', 'https://www.mathway.com/Algebra', 'Interactive problem solver', 'tool', 'Class 9', 'Mathematics', 'https://example.com/math9-3.jpg', 'Mathway', 'Mathway', 'english', false, 4.6),

-- Science Class 9
('Physics Laws and Principles', 'https://www.physicsclassroom.com/', 'Learn physics laws', 'video', 'Class 9', 'Science', 'https://example.com/science9-1.jpg', 'Physics Classroom', 'Physics Classroom', 'english', true, 4.7),
('Chemistry Fundamentals', 'https://www.chemtutor.com/', 'Basic chemistry concepts', 'tutorial', 'Class 9', 'Science', 'https://example.com/science9-2.jpg', 'ChemTutor', 'ChemTutor', 'english', true, 4.6),
('Biology Study Materials', 'https://www.ck12.org/biology/', 'Comprehensive biology guide', 'document', 'Class 9', 'Science', 'https://example.com/science9-3.jpg', 'CK-12', 'CK-12', 'english', true, 4.8),

-- English Class 9
('English Grammar Course', 'https://www.englishgrammar.org/9th/', 'Complete grammar course', 'course', 'Class 9', 'English', 'https://example.com/english9-1.jpg', 'English Expert', 'English Grammar', 'english', true, 4.6),
('Vocabulary Builder', 'https://vocabulary.com/9th/', 'Build your vocabulary', 'tool', 'Class 9', 'English', 'https://example.com/english9-2.jpg', 'Vocabulary.com', 'Vocabulary.com', 'english', false, 4.7),
('Reading Comprehension', 'https://readworks.org/9th/', 'Practice reading comprehension', 'tutorial', 'Class 9', 'English', 'https://example.com/english9-3.jpg', 'ReadWorks', 'ReadWorks', 'english', true, 4.5),
('Writing Skills', 'https://writeathome.com/9th/', 'Improve writing skills', 'course', 'Class 9', 'English', 'https://example.com/english9-4.jpg', 'Write at Home', 'Write at Home', 'english', false, 4.8),
('English Literature', 'https://ncert.nic.in/english9', 'English literature textbook', 'book', 'Class 9', 'English', 'https://example.com/english9-5.jpg', 'NCERT', 'NCERT', 'english', true, 4.6),

-- Social Studies Class 9
('World History', 'https://www.historyforkids.net/9th/', 'Learn world history', 'video', 'Class 9', 'Social Studies', 'https://example.com/social9-1.jpg', 'History for Kids', 'History for Kids', 'english', true, 4.7),
('Geography Interactive Maps', 'https://www.geographymap.com/9th/', 'Interactive geography maps', 'tool', 'Class 9', 'Social Studies', 'https://example.com/social9-2.jpg', 'Geography Map', 'Geography Map', 'english', false, 4.6),
('Civics Study Guide', 'https://www.civicsguide.com/9th/', 'Learn about civics', 'document', 'Class 9', 'Social Studies', 'https://example.com/social9-3.jpg', 'Civics Guide', 'Civics Guide', 'english', true, 4.5),
('Economics Basics', 'https://www.economicsforkids.com/9th/', 'Basic economics concepts', 'tutorial', 'Class 9', 'Social Studies', 'https://example.com/social9-4.jpg', 'Economics for Kids', 'Economics for Kids', 'english', true, 4.7),
('Social Studies Textbook', 'https://ncert.nic.in/social9', 'Social studies textbook', 'book', 'Class 9', 'Social Studies', 'https://example.com/social9-5.jpg', 'NCERT', 'NCERT', 'english', true, 4.6),

-- Nepali Class 9
('नेपाली व्याकरण', 'https://www.hamropatro.com/nepali9', 'नेपाली व्याकरण सिक्नुहोस्', 'video', 'Class 9', 'Nepali', 'https://example.com/nepali9-1.jpg', 'Hamro Patro', 'Hamro Patro', 'nepali', true, 4.8),
('नेपाली साहित्य', 'https://www.nepalilibrary.com/9th/', 'नेपाली साहित्य अध्ययन', 'document', 'Class 9', 'Nepali', 'https://example.com/nepali9-2.jpg', 'Nepali Library', 'Nepali Library', 'nepali', true, 4.7),
('नेपाली लेखन कला', 'https://www.nepaliwriting.com/9th/', 'नेपाली लेखन सीप', 'tutorial', 'Class 9', 'Nepali', 'https://example.com/nepali9-3.jpg', 'Nepali Writing', 'Nepali Writing', 'nepali', true, 4.6),
('नेपाली पाठ्यपुस्तक', 'https://ncert.nic.in/nepali9', 'नेपाली पाठ्यपुस्तक', 'book', 'Class 9', 'Nepali', 'https://example.com/nepali9-4.jpg', 'NCERT', 'NCERT', 'nepali', true, 4.7),
('नेपाली अभ्यास', 'https://www.nepalipractice.com/9th/', 'नेपाली भाषा अभ्यास', 'tool', 'Class 9', 'Nepali', 'https://example.com/nepali9-5.jpg', 'Nepali Practice', 'Nepali Practice', 'nepali', false, 4.5);

-- Insert sample data for Class 10
INSERT INTO public.educational_resources (title, url, description, resource_type, class_level, subject, thumbnail_url, author, platform, language, is_free, rating) VALUES
-- Mathematics Class 10
('Advanced Trigonometry', 'https://www.khanacademy.org/math/trigonometry-advanced', 'Advanced trigonometry concepts', 'video', 'Class 10', 'Mathematics', 'https://example.com/math10-1.jpg', 'Khan Academy', 'Khan Academy', 'english', true, 4.8),
('Math Problem Solving', 'https://www.mathway.com/Algebra', 'Interactive problem solver', 'tool', 'Class 10', 'Mathematics', 'https://example.com/math10-2.jpg', 'Mathway', 'Mathway', 'english', false, 4.6),

-- Science Class 10
('Physics Laws and Principles', 'https://www.physicsclassroom.com/', 'Learn physics laws', 'video', 'Class 10', 'Science', 'https://example.com/science10-1.jpg', 'Physics Classroom', 'Physics Classroom', 'english', true, 4.7),
('Chemistry Fundamentals', 'https://www.chemtutor.com/', 'Basic chemistry concepts', 'tutorial', 'Class 10', 'Science', 'https://example.com/science10-2.jpg', 'ChemTutor', 'ChemTutor', 'english', true, 4.6),
('Biology Study Materials', 'https://www.ck12.org/biology/', 'Comprehensive biology guide', 'document', 'Class 10', 'Science', 'https://example.com/science10-3.jpg', 'CK-12', 'CK-12', 'english', true, 4.8),

-- English Class 10
('English Grammar Course', 'https://www.englishgrammar.org/10th/', 'Complete grammar course', 'course', 'Class 10', 'English', 'https://example.com/english10-1.jpg', 'English Expert', 'English Grammar', 'english', true, 4.6),
('Vocabulary Builder', 'https://vocabulary.com/10th/', 'Build your vocabulary', 'tool', 'Class 10', 'English', 'https://example.com/english10-2.jpg', 'Vocabulary.com', 'Vocabulary.com', 'english', false, 4.7),
('Reading Comprehension', 'https://readworks.org/10th/', 'Practice reading comprehension', 'tutorial', 'Class 10', 'English', 'https://example.com/english10-3.jpg', 'ReadWorks', 'ReadWorks', 'english', true, 4.5),
('Writing Skills', 'https://writeathome.com/10th/', 'Improve writing skills', 'course', 'Class 10', 'English', 'https://example.com/english10-4.jpg', 'Write at Home', 'Write at Home', 'english', false, 4.8),
('English Literature', 'https://ncert.nic.in/english10', 'English literature textbook', 'book', 'Class 10', 'English', 'https://example.com/english10-5.jpg', 'NCERT', 'NCERT', 'english', true, 4.6),

-- Social Studies Class 10
('World History', 'https://www.historyforkids.net/10th/', 'Learn world history', 'video', 'Class 10', 'Social Studies', 'https://example.com/social10-1.jpg', 'History for Kids', 'History for Kids', 'english', true, 4.7),
('Geography Interactive Maps', 'https://www.geographymap.com/10th/', 'Interactive geography maps', 'tool', 'Class 10', 'Social Studies', 'https://example.com/social10-2.jpg', 'Geography Map', 'Geography Map', 'english', false, 4.6),
('Civics Study Guide', 'https://www.civicsguide.com/10th/', 'Learn about civics', 'document', 'Class 10', 'Social Studies', 'https://example.com/social10-3.jpg', 'Civics Guide', 'Civics Guide', 'english', true, 4.5),
('Economics Basics', 'https://www.economicsforkids.com/10th/', 'Basic economics concepts', 'tutorial', 'Class 10', 'Social Studies', 'https://example.com/social10-4.jpg', 'Economics for Kids', 'Economics for Kids', 'english', true, 4.7),
('Social Studies Textbook', 'https://ncert.nic.in/social10', 'Social studies textbook', 'book', 'Class 10', 'Social Studies', 'https://example.com/social10-5.jpg', 'NCERT', 'NCERT', 'english', true, 4.6),

-- Nepali Class 10
('नेपाली व्याकरण', 'https://www.hamropatro.com/nepali10', 'नेपाली व्याकरण सिक्नुहोस्', 'video', 'Class 10', 'Nepali', 'https://example.com/nepali10-1.jpg', 'Hamro Patro', 'Hamro Patro', 'nepali', true, 4.8),
('नेपाली साहित्य', 'https://www.nepalilibrary.com/10th/', 'नेपाली साहित्य अध्ययन', 'document', 'Class 10', 'Nepali', 'https://example.com/nepali10-2.jpg', 'Nepali Library', 'Nepali Library', 'nepali', true, 4.7),
('नेपाली लेखन कला', 'https://www.nepaliwriting.com/10th/', 'नेपाली लेखन सीप', 'tutorial', 'Class 10', 'Nepali', 'https://example.com/nepali10-3.jpg', 'Nepali Writing', 'Nepali Writing', 'nepali', true, 4.6),
('नेपाली पाठ्यपुस्तक', 'https://ncert.nic.in/nepali10', 'नेपाली पाठ्यपुस्तक', 'book', 'Class 10', 'Nepali', 'https://example.com/nepali10-4.jpg', 'NCERT', 'NCERT', 'nepali', true, 4.7),
('नेपाली अभ्यास', 'https://www.nepalipractice.com/10th/', 'नेपाली भाषा अभ्यास', 'tool', 'Class 10', 'Nepali', 'https://example.com/nepali10-5.jpg', 'Nepali Practice', 'Nepali Practice', 'nepali', false, 4.5);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_educational_resources_updated_at
    BEFORE UPDATE ON educational_resources
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
