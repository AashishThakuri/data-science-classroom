import { EducationalResource } from '@/types/resources';

export const resources: EducationalResource[] = [
  // Data Science Resources
  {
    id: 'ds1',
    title: 'Machine Learning Specialization',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    description: 'Comprehensive machine learning course by Andrew Ng',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Machine Learning',
    thumbnail_url: null,
    author: 'Andrew Ng',
    platform: 'Coursera',
    language: 'English',
    is_free: false,
    rating: 4.9,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ds2',
    title: 'Deep Learning Specialization',
    url: 'https://www.coursera.org/specializations/deep-learning',
    description: 'Advanced deep learning concepts and applications',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Deep Learning',
    thumbnail_url: null,
    author: 'Andrew Ng',
    platform: 'Coursera',
    language: 'English',
    is_free: false,
    rating: 4.8,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ds3',
    title: 'Python for Data Science and Machine Learning Bootcamp',
    url: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp',
    description: 'Complete guide to using Python for Data Science and Machine Learning',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Python Programming',
    thumbnail_url: null,
    author: 'Jose Portilla',
    platform: 'Udemy',
    language: 'English',
    is_free: false,
    rating: 4.7,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  // Add 15 more Data Science resources...
  
  // Bioinformatics Resources
  {
    id: 'bio1',
    title: 'Introduction to Genomic Technologies',
    url: 'https://www.coursera.org/learn/introduction-genomics',
    description: 'Learn the basics of genomic technologies and their applications',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Genomics',
    thumbnail_url: null,
    author: 'Johns Hopkins University',
    platform: 'Coursera',
    language: 'English',
    is_free: false,
    rating: 4.7,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'bio2',
    title: 'Bioinformatics Specialization',
    url: 'https://www.coursera.org/specializations/bioinformatics',
    description: 'Master bioinformatics software and computational methods',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Computational Biology',
    thumbnail_url: null,
    author: 'UC San Diego',
    platform: 'Coursera',
    language: 'English',
    is_free: false,
    rating: 4.6,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  // Add 15 more Bioinformatics resources...
  
  // Computational Mathematics Resources
  {
    id: 'math1',
    title: 'Numerical Methods for Engineers',
    url: 'https://ocw.mit.edu/courses/mathematics/18-335j-introduction-to-numerical-methods-fall-2010/',
    description: 'Introduction to numerical methods and scientific computing',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Numerical Methods',
    thumbnail_url: null,
    author: 'MIT OpenCourseWare',
    platform: 'MIT OCW',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'math2',
    title: 'Differential Equations for Engineers',
    url: 'https://www.edx.org/learn/differential-equations/boston-university-differential-equations',
    description: 'Learn to solve and apply differential equations',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Differential Equations',
    thumbnail_url: null,
    author: 'Boston University',
    platform: 'edX',
    language: 'English',
    is_free: false,
    rating: 4.5,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  // Add 15 more Computational Mathematics resources...
];

// Data Science Resources by Subject
export const dataScience = resources.filter(r => r.class_level === 'Data Science');
export const bioinformatics = resources.filter(r => r.class_level === 'Bioinformatics');
export const computationalMath = resources.filter(r => r.class_level === 'Computational Mathematics');
