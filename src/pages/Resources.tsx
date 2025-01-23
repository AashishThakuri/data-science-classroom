import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, ExternalLink, BookOpen, Video, FileText, GraduationCap, Book, Newspaper, Wrench, BookOpenCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface EducationalResource {
  id: string;
  title: string;
  url: string;
  description: string | null;
  resource_type: 'video' | 'tutorial' | 'document' | 'course' | 'book' | 'article' | 'tool';
  class_level: string;
  subject: string;
  thumbnail_url: string | null;
  author: string | null;
  platform: string | null;
  language: string;
  is_free: boolean;
  rating: number | null;
  created_at: string;
  updated_at: string;
}

const faculties = ['Data Science', 'Bioinformatics', 'Computational Mathematics'];

const subjectsByLevel: Record<string, string[]> = {
  'Data Science': [
    'Python Programming',
    'Machine Learning',
    'Data Analysis',
    'Deep Learning',
    'Statistics',
    'Big Data',
    'Data Visualization',
    'Natural Language Processing',
    'Computer Vision'
  ],
  'Bioinformatics': [
    'Genomics',
    'Proteomics',
    'Sequence Analysis',
    'Molecular Biology',
    'Computational Biology',
    'Systems Biology',
    'Structural Bioinformatics',
    'Biostatistics'
  ],
  'Computational Mathematics': [
    'Numerical Analysis',
    'Mathematical Modeling',
    'Optimization',
    'Linear Algebra',
    'Differential Equations',
    'Scientific Computing',
    'Discrete Mathematics',
    'Computational Geometry'
  ]
};

const initialResources: EducationalResource[] = [
  // Data Science Resources
  {
    id: '1',
    title: 'Machine Learning by Stanford (Andrew Ng)',
    url: 'https://www.coursera.org/learn/machine-learning',
    description: 'One of the most popular machine learning courses covering fundamental concepts.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Machine Learning',
    thumbnail_url: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/08/33f720502a11e59e72391aa537f5c9/pythonlearn_thumbnail_1x1.png',
    author: 'Andrew Ng',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Deep Learning Specialization',
    url: 'https://www.coursera.org/specializations/deep-learning',
    description: 'Five-course specialization to learn deep learning fundamentals.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Deep Learning',
    thumbnail_url: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/83/e258e0532611e5837d7108c3a5aaaf/DeepLearningSpecialization.png',
    author: 'Andrew Ng',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Fast.ai - Practical Deep Learning for Coders',
    url: 'https://course.fast.ai/',
    description: 'Free course teaching deep learning using PyTorch.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Deep Learning',
    thumbnail_url: 'https://course.fast.ai/images/fastai_paper/show_batch.png',
    author: 'Jeremy Howard',
    platform: 'Fast.ai',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Python Data Science Handbook',
    url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
    description: 'Comprehensive guide to Python data science tools.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Python Programming',
    thumbnail_url: 'https://jakevdp.github.io/PythonDataScienceHandbook/figures/PDSH-cover.png',
    author: 'Jake VanderPlas',
    platform: 'O\'Reilly',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    title: 'Statistics and Probability in Data Science using Python',
    url: 'https://www.edx.org/course/statistics-and-probability-in-data-science-using-python',
    description: 'Learn statistics fundamentals for data science.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Statistics',
    thumbnail_url: null,
    author: 'UC San Diego',
    platform: 'edX',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11',
    title: 'Applied Data Science with Python Specialization',
    url: 'https://www.coursera.org/specializations/data-science-python',
    description: 'Five-course series covering data science fundamentals using Python.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Python Programming',
    thumbnail_url: null,
    author: 'University of Michigan',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '12',
    title: 'Data Science: R Basics',
    url: 'https://www.edx.org/course/data-science-r-basics',
    description: 'Introduction to R programming for data science.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Data Analysis',
    thumbnail_url: null,
    author: 'Harvard University',
    platform: 'edX',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '13',
    title: 'Natural Language Processing Specialization',
    url: 'https://www.coursera.org/specializations/natural-language-processing',
    description: 'Four-course specialization in NLP using deep learning.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Natural Language Processing',
    thumbnail_url: null,
    author: 'DeepLearning.AI',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '14',
    title: 'Computer Vision Basics',
    url: 'https://www.coursera.org/learn/computer-vision-basics',
    description: 'Introduction to computer vision fundamentals.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Computer Vision',
    thumbnail_url: null,
    author: 'University at Buffalo',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '15',
    title: 'Big Data Analysis with Scala and Spark',
    url: 'https://www.coursera.org/learn/scala-spark-big-data',
    description: 'Learn to process big data using Scala and Spark.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Big Data',
    thumbnail_url: null,
    author: 'École Polytechnique Fédérale de Lausanne',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Bioinformatics Resources
  {
    id: '6',
    title: 'Introduction to Genomic Technologies',
    url: 'https://www.coursera.org/learn/introduction-genomics',
    description: 'Learn about DNA sequencing and genomic technologies.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Genomics',
    thumbnail_url: null,
    author: 'Johns Hopkins University',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    title: 'Introduction to Statistical Learning',
    url: 'https://www.statlearning.com/',
    description: 'Comprehensive introduction to statistical learning methods.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Statistics',
    thumbnail_url: 'https://images.springer.com/sgw/books/medium/9781461471370.jpg',
    author: 'Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani',
    platform: 'Springer',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    title: 'Structural Bioinformatics',
    url: 'https://www.coursera.org/learn/structural-bioinformatics',
    description: 'Learn about protein structure prediction and analysis.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Structural Bioinformatics',
    thumbnail_url: null,
    author: 'UC San Diego',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '16',
    title: 'DNA Sequencing: Decoding the Language of Life',
    url: 'https://www.edx.org/course/dna-sequencing-decoding-the-language-of-life',
    description: 'Learn about DNA sequencing technologies and analysis.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Genomics',
    thumbnail_url: null,
    author: 'Johns Hopkins University',
    platform: 'edX',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '17',
    title: 'Proteomics: Understanding the Protein Language',
    url: 'https://www.edx.org/course/proteomics-understanding-the-protein-language',
    description: 'Introduction to protein analysis and proteomics.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Proteomics',
    thumbnail_url: null,
    author: 'University of Maryland',
    platform: 'edX',
    language: 'English',
    is_free: true,
    rating: 4.5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '18',
    title: 'Pattern Recognition and Machine Learning',
    url: 'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/',
    description: 'Comprehensive book on pattern recognition and machine learning.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Machine Learning',
    thumbnail_url: 'https://m.media-amazon.com/images/I/61ECBlvkBCL._SL1000_.jpg',
    author: 'Christopher Bishop',
    platform: 'Springer',
    language: 'English',
    is_free: false,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '19',
    title: 'Differential Equations in Action',
    url: 'https://www.udacity.com/course/differential-equations-in-action--cs222',
    description: 'Learn to solve real-world problems using differential equations.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Differential Equations',
    thumbnail_url: null,
    author: 'Udacity',
    platform: 'Udacity',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '20',
    title: 'Discrete Mathematics',
    url: 'https://www.coursera.org/learn/discrete-mathematics',
    description: 'Introduction to discrete mathematics and its applications.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Discrete Mathematics',
    thumbnail_url: null,
    author: 'Shanghai Jiao Tong University',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '21',
    title: 'Data Visualization with Python',
    url: 'https://www.coursera.org/learn/python-for-data-visualization',
    description: 'Learn to create impactful data visualizations using Python libraries.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Data Visualization',
    thumbnail_url: null,
    author: 'IBM',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22',
    title: 'Statistical Learning',
    url: 'https://www.edx.org/course/statistical-learning',
    description: 'Stanford course on statistical learning methods.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Statistics',
    thumbnail_url: null,
    author: 'Stanford University',
    platform: 'edX',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '23',
    title: 'Molecular Biology - Part 1',
    url: 'https://www.edx.org/course/molecular-biology-part-1',
    description: 'Introduction to molecular biology fundamentals.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Molecular Biology',
    thumbnail_url: null,
    author: 'MIT',
    platform: 'edX',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '24',
    title: 'Algorithms for DNA Sequencing',
    url: 'https://www.coursera.org/learn/dna-sequencing',
    description: 'Learn computational methods for DNA sequence analysis.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Sequence Analysis',
    thumbnail_url: null,
    author: 'Johns Hopkins University',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '25',
    title: 'Bayesian Data Analysis',
    url: 'http://www.stat.columbia.edu/~gelman/book/',
    description: 'Comprehensive guide to Bayesian statistical methods.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Statistics',
    thumbnail_url: 'https://m.media-amazon.com/images/I/61qZFrOgwzL._SL1000_.jpg',
    author: 'Andrew Gelman',
    platform: 'Chapman and Hall/CRC',
    language: 'English',
    is_free: false,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '26',
    title: 'Optimization Methods in Business Analytics',
    url: 'https://www.edx.org/course/optimization-methods-in-business-analytics',
    description: 'Learn optimization techniques for solving complex problems.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Optimization',
    thumbnail_url: null,
    author: 'MIT',
    platform: 'edX',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '27',
    title: 'Computational Geometry',
    url: 'https://www.coursera.org/learn/computational-geometry',
    description: 'Introduction to geometric algorithms and applications.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Computational Geometry',
    thumbnail_url: null,
    author: 'Saint Petersburg State University',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '28',
    title: 'Scientific Computing with Python',
    url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
    description: 'Learn Python for scientific computing applications.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Scientific Computing',
    thumbnail_url: null,
    author: 'freeCodeCamp',
    platform: 'freeCodeCamp',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '29',
    title: 'Mathematical Modeling and Simulation',
    url: 'https://ocw.mit.edu/courses/mathematics/18-330-introduction-to-numerical-analysis-spring-2012/',
    description: 'Learn to create and analyze mathematical models.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Mathematical Modeling',
    thumbnail_url: null,
    author: 'MIT OpenCourseWare',
    platform: 'MIT OCW',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '30',
    title: 'Advanced Data Structures',
    url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-851-advanced-data-structures-spring-2012/',
    description: 'Advanced course on data structures and algorithms.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Python Programming',
    thumbnail_url: null,
    author: 'MIT OpenCourseWare',
    platform: 'MIT OCW',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '31',
    title: 'Neural Networks and Deep Learning',
    url: 'http://neuralnetworksanddeeplearning.com/',
    description: 'Free online book about neural networks and deep learning.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Deep Learning',
    thumbnail_url: 'https://m.media-amazon.com/images/I/61fim5QqaqL._SL1500_.jpg',
    author: 'Michael Nielsen',
    platform: 'Online Book',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '32',
    title: 'Introduction to Computational Thinking',
    url: 'https://computationalthinking.mit.edu/',
    description: 'Learn computational thinking using Julia programming.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Scientific Computing',
    thumbnail_url: null,
    author: 'MIT',
    platform: 'MIT',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33',
    title: 'Protein Structure Prediction',
    url: 'https://www.coursera.org/learn/protein-structure',
    description: 'Learn methods for predicting protein structures.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Structural Bioinformatics',
    thumbnail_url: null,
    author: 'University of California San Diego',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '34',
    title: 'Applied Machine Learning in Python',
    url: 'https://www.coursera.org/learn/python-machine-learning',
    description: 'Practical machine learning with scikit-learn.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Machine Learning',
    thumbnail_url: null,
    author: 'University of Michigan',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '35',
    title: 'Computational Biology Specialization',
    url: 'https://www.coursera.org/specializations/computational-biology',
    description: 'Complete specialization in computational biology methods.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Computational Biology',
    thumbnail_url: null,
    author: 'University of California San Diego',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '36',
    title: 'Numerical Methods for Partial Differential Equations',
    url: 'https://ocw.mit.edu/courses/mathematics/18-336-numerical-methods-for-partial-differential-equations-spring-2009/',
    description: 'Advanced course on numerical methods for PDEs.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Numerical Analysis',
    thumbnail_url: null,
    author: 'MIT OpenCourseWare',
    platform: 'MIT OCW',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Data Science Resources
  {
    id: '37',
    title: 'Fast.ai - Practical Deep Learning for Coders',
    url: 'https://course.fast.ai/',
    description: 'Free course teaching deep learning using PyTorch.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Deep Learning',
    thumbnail_url: null,
    author: 'Jeremy Howard',
    platform: 'Fast.ai',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '38',
    title: 'Python Data Science Handbook',
    url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
    description: 'Comprehensive guide to Python data science tools.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Python Programming',
    thumbnail_url: null,
    author: 'Jake VanderPlas',
    platform: 'GitHub',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '39',
    title: 'Statistics and Probability in Data Science using Python',
    url: 'https://www.edx.org/course/statistics-and-probability-in-data-science-using-python',
    description: 'Learn statistics fundamentals for data science.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Statistics',
    thumbnail_url: null,
    author: 'UC San Diego',
    platform: 'edX',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '40',
    title: 'Applied Data Science with Python Specialization',
    url: 'https://www.coursera.org/specializations/data-science-python',
    description: 'Five-course series covering data science fundamentals using Python.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Python Programming',
    thumbnail_url: null,
    author: 'University of Michigan',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '41',
    title: 'Scikit-learn Documentation & Tutorials',
    url: 'https://scikit-learn.org/stable/tutorial/index.html',
    description: 'Official tutorials for the popular machine learning library.',
    resource_type: 'tutorial',
    class_level: 'Data Science',
    subject: 'Machine Learning',
    thumbnail_url: null,
    author: 'Scikit-learn Team',
    platform: 'Scikit-learn',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Bioinformatics Resources
  {
    id: '42',
    title: 'Rosalind: Platform for Learning Bioinformatics',
    url: 'http://rosalind.info/',
    description: 'Learn bioinformatics through problem solving.',
    resource_type: 'tutorial',
    class_level: 'Bioinformatics',
    subject: 'Sequence Analysis',
    thumbnail_url: null,
    author: 'Rosalind Team',
    platform: 'Rosalind',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '43',
    title: 'Biopython Tutorial and Cookbook',
    url: 'http://biopython.org/DIST/docs/tutorial/Tutorial.html',
    description: 'Comprehensive guide to Biopython library.',
    resource_type: 'tutorial',
    class_level: 'Bioinformatics',
    subject: 'Computational Biology',
    thumbnail_url: null,
    author: 'Biopython Team',
    platform: 'Biopython',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Computational Mathematics Resources
  {
    id: '44',
    title: 'Introduction to Numerical Methods',
    url: 'https://ocw.mit.edu/courses/mathematics/18-335j-introduction-to-numerical-methods-spring-2019/',
    description: 'Comprehensive course on numerical methods.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Numerical Analysis',
    thumbnail_url: null,
    author: 'MIT OpenCourseWare',
    platform: 'MIT OCW',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '45',
    title: 'NumPy for Scientific Computing',
    url: 'https://numpy.org/learn/',
    description: 'Official tutorials and documentation for NumPy.',
    resource_type: 'tutorial',
    class_level: 'Computational Mathematics',
    subject: 'Scientific Computing',
    thumbnail_url: null,
    author: 'NumPy Team',
    platform: 'NumPy',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '46',
    title: 'TensorFlow Documentation & Tutorials',
    url: 'https://www.tensorflow.org/tutorials',
    description: 'Official TensorFlow tutorials and guides.',
    resource_type: 'tutorial',
    class_level: 'Data Science',
    subject: 'Deep Learning',
    thumbnail_url: null,
    author: 'Google',
    platform: 'TensorFlow',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '47',
    title: 'Data Visualization with Seaborn',
    url: 'https://seaborn.pydata.org/tutorial.html',
    description: 'Learn statistical data visualization with Seaborn.',
    resource_type: 'tutorial',
    class_level: 'Data Science',
    subject: 'Data Visualization',
    thumbnail_url: null,
    author: 'Seaborn Team',
    platform: 'Seaborn',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '48',
    title: 'Natural Language Processing with Transformers',
    url: 'https://huggingface.co/course/chapter1/1',
    description: 'Learn NLP with modern transformer models.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Natural Language Processing',
    thumbnail_url: null,
    author: 'Hugging Face',
    platform: 'Hugging Face',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '49',
    title: 'Genomics Data Science Specialization',
    url: 'https://www.coursera.org/specializations/genomic-data-science',
    description: 'Learn to analyze genomic data using Python and R.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Genomics',
    thumbnail_url: null,
    author: 'Johns Hopkins University',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '50',
    title: 'SciPy Lecture Notes',
    url: 'https://scipy-lectures.org/',
    description: 'Advanced scientific computing with Python.',
    resource_type: 'tutorial',
    class_level: 'Computational Mathematics',
    subject: 'Scientific Computing',
    thumbnail_url: null,
    author: 'SciPy Team',
    platform: 'SciPy',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Python Programming Resources
  {
    id: '51',
    title: 'Python for Data Science and Machine Learning Bootcamp',
    url: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/',
    description: 'Comprehensive Python programming course for data science.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Python Programming',
    thumbnail_url: null,
    author: 'Jose Portilla',
    platform: 'Udemy',
    language: 'English',
    is_free: false,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '52',
    title: 'Real Python Tutorials',
    url: 'https://realpython.com/',
    description: 'In-depth Python programming tutorials and articles.',
    resource_type: 'tutorial',
    class_level: 'Data Science',
    subject: 'Python Programming',
    thumbnail_url: null,
    author: 'Real Python Team',
    platform: 'Real Python',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Machine Learning Resources
  {
    id: '53',
    title: 'Machine Learning Specialization',
    url: 'https://www.deeplearning.ai/courses/machine-learning-specialization/',
    description: 'Complete machine learning specialization from basics to advanced.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Machine Learning',
    thumbnail_url: null,
    author: 'Andrew Ng',
    platform: 'DeepLearning.AI',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '54',
    title: 'Introduction to Statistical Learning',
    url: 'https://www.statlearning.com/',
    description: 'Comprehensive introduction to statistical learning methods.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Machine Learning',
    thumbnail_url: null,
    author: 'Gareth James et al.',
    platform: 'StatLearning',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Data Analysis Resources
  {
    id: '55',
    title: 'Pandas Documentation & User Guide',
    url: 'https://pandas.pydata.org/docs/user_guide/index.html',
    description: 'Official documentation and tutorials for Pandas.',
    resource_type: 'tutorial',
    class_level: 'Data Science',
    subject: 'Data Analysis',
    thumbnail_url: null,
    author: 'Pandas Development Team',
    platform: 'Pandas',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '56',
    title: 'Data Analysis with Python',
    url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
    description: 'Learn data analysis using Python and popular libraries.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Data Analysis',
    thumbnail_url: null,
    author: 'freeCodeCamp',
    platform: 'freeCodeCamp',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Deep Learning Resources
  {
    id: '57',
    title: 'Deep Learning Book',
    url: 'https://www.deeplearningbook.org/',
    description: 'Comprehensive deep learning textbook.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Deep Learning',
    thumbnail_url: null,
    author: 'Ian Goodfellow et al.',
    platform: 'MIT Press',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '58',
    title: 'PyTorch Tutorials',
    url: 'https://pytorch.org/tutorials/',
    description: 'Official PyTorch tutorials and examples.',
    resource_type: 'tutorial',
    class_level: 'Data Science',
    subject: 'Deep Learning',
    thumbnail_url: null,
    author: 'PyTorch Team',
    platform: 'PyTorch',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Statistics Resources
  {
    id: '59',
    title: 'Statistical Thinking for the 21st Century',
    url: 'https://statsthinking21.org/',
    description: 'Modern introduction to statistics with R and Python.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Statistics',
    thumbnail_url: null,
    author: 'Russell Poldrack',
    platform: 'statsthinking21',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '60',
    title: 'Think Stats',
    url: 'https://greenteapress.com/wp/think-stats-2e/',
    description: 'Introduction to Probability and Statistics for Python Programmers.',
    resource_type: 'book',
    class_level: 'Data Science',
    subject: 'Statistics',
    thumbnail_url: null,
    author: 'Allen B. Downey',
    platform: 'Green Tea Press',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Big Data Resources
  {
    id: '61',
    title: 'Apache Spark Documentation',
    url: 'https://spark.apache.org/docs/latest/',
    description: 'Official documentation for Apache Spark.',
    resource_type: 'tutorial',
    class_level: 'Data Science',
    subject: 'Big Data',
    thumbnail_url: null,
    author: 'Apache Spark Team',
    platform: 'Apache',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '62',
    title: 'Big Data Specialization',
    url: 'https://www.coursera.org/specializations/big-data',
    description: 'Learn Big Data concepts and tools.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Big Data',
    thumbnail_url: null,
    author: 'UC San Diego',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Bioinformatics - Genomics Resources
  {
    id: '63',
    title: 'Introduction to Genomic Technologies',
    url: 'https://www.coursera.org/learn/introduction-genomics',
    description: 'Learn fundamentals of genomic technologies.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Genomics',
    thumbnail_url: null,
    author: 'Johns Hopkins University',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '64',
    title: 'Galaxy Project Tutorials',
    url: 'https://training.galaxyproject.org/',
    description: 'Learn genomics data analysis using Galaxy platform.',
    resource_type: 'tutorial',
    class_level: 'Bioinformatics',
    subject: 'Genomics',
    thumbnail_url: null,
    author: 'Galaxy Team',
    platform: 'Galaxy Project',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Bioinformatics - Proteomics Resources
  {
    id: '65',
    title: 'Introduction to Mass Spectrometry',
    url: 'https://www.coursera.org/learn/mass-spectrometry',
    description: 'Learn fundamentals of mass spectrometry for proteomics.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Proteomics',
    thumbnail_url: null,
    author: 'University of Geneva',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '66',
    title: 'MaxQuant and Perseus Documentation',
    url: 'https://maxquant.net/maxquant/',
    description: 'Learn to use MaxQuant software for proteomics analysis.',
    resource_type: 'tutorial',
    class_level: 'Bioinformatics',
    subject: 'Proteomics',
    thumbnail_url: null,
    author: 'MaxQuant Team',
    platform: 'MaxQuant',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Bioinformatics - Sequence Analysis Resources
  {
    id: '67',
    title: 'BLAST Documentation and Tutorials',
    url: 'https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs',
    description: 'Learn to use BLAST for sequence analysis.',
    resource_type: 'tutorial',
    class_level: 'Bioinformatics',
    subject: 'Sequence Analysis',
    thumbnail_url: null,
    author: 'NCBI',
    platform: 'NCBI',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '68',
    title: 'Sequence Analysis Tools and Methods',
    url: 'https://www.ebi.ac.uk/training/online/courses/protein-sequence-analysis/',
    description: 'Comprehensive guide to sequence analysis tools.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Sequence Analysis',
    thumbnail_url: null,
    author: 'EMBL-EBI',
    platform: 'EBI Training',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Computational Mathematics - Numerical Analysis Resources
  {
    id: '69',
    title: 'Numerical Methods in Python',
    url: 'https://numerical-methods.eng.unimelb.edu.au/',
    description: 'Learn numerical methods with Python implementation.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Numerical Analysis',
    thumbnail_url: null,
    author: 'University of Melbourne',
    platform: 'UniMelb',
    language: 'English',
    is_free: true,
    rating: 4.6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '70',
    title: 'Numerical Linear Algebra',
    url: 'https://www.fast.ai/2017/07/17/num-lin-alg/',
    description: 'Advanced course in numerical linear algebra.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Numerical Analysis',
    thumbnail_url: null,
    author: 'Rachel Thomas',
    platform: 'fast.ai',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Computational Mathematics - Mathematical Modeling Resources
  {
    id: '71',
    title: 'Mathematical Modeling in Python',
    url: 'https://www.math.ubc.ca/~pwalls/math-python/',
    description: 'Introduction to mathematical modeling using Python.',
    resource_type: 'tutorial',
    class_level: 'Computational Mathematics',
    subject: 'Mathematical Modeling',
    thumbnail_url: null,
    author: 'Patrick Walls',
    platform: 'UBC Mathematics',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '72',
    title: 'Applied Mathematical Modeling',
    url: 'https://ocw.mit.edu/courses/mathematics/18-086-mathematical-methods-for-engineers-ii-spring-2006/',
    description: 'Advanced course in mathematical modeling.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Mathematical Modeling',
    thumbnail_url: null,
    author: 'MIT OpenCourseWare',
    platform: 'MIT OCW',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Computational Mathematics - Optimization Resources
  {
    id: '73',
    title: 'Convex Optimization',
    url: 'https://web.stanford.edu/~boyd/cvxbook/',
    description: 'Comprehensive book on convex optimization.',
    resource_type: 'book',
    class_level: 'Computational Mathematics',
    subject: 'Optimization',
    thumbnail_url: null,
    author: 'Stephen Boyd',
    platform: 'Stanford',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '74',
    title: 'Optimization Methods',
    url: 'https://www.coursera.org/learn/optimization-methods-business-analytics',
    description: 'Learn optimization methods for data science.',
    resource_type: 'course',
    class_level: 'Computational Mathematics',
    subject: 'Optimization',
    thumbnail_url: null,
    author: 'University of Pennsylvania',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Bioinformatics - Molecular Biology Resources
  {
    id: '75',
    title: 'Molecular Biology of the Cell',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK21054/',
    description: 'Comprehensive textbook on molecular biology.',
    resource_type: 'book',
    class_level: 'Bioinformatics',
    subject: 'Molecular Biology',
    thumbnail_url: null,
    author: 'Bruce Alberts et al.',
    platform: 'NCBI Bookshelf',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Bioinformatics - Systems Biology Resources
  {
    id: '76',
    title: 'Systems Biology and Biotechnology Specialization',
    url: 'https://www.coursera.org/specializations/systems-biology',
    description: 'Learn systems biology approaches and methods.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Systems Biology',
    thumbnail_url: null,
    author: 'Icahn School of Medicine at Mount Sinai',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Computational Mathematics - Linear Algebra Resources
  {
    id: '77',
    title: 'Linear Algebra and Learning from Data',
    url: 'https://math.mit.edu/~gs/learningfromdata/',
    description: 'Modern approach to linear algebra for data science.',
    resource_type: 'book',
    class_level: 'Computational Mathematics',
    subject: 'Linear Algebra',
    thumbnail_url: null,
    author: 'Gilbert Strang',
    platform: 'MIT Mathematics',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Data Science - Computer Vision Resources
  {
    id: '78',
    title: 'CS231n: Convolutional Neural Networks',
    url: 'http://cs231n.stanford.edu/',
    description: 'Stanford course on deep learning for computer vision.',
    resource_type: 'course',
    class_level: 'Data Science',
    subject: 'Computer Vision',
    thumbnail_url: null,
    author: 'Stanford University',
    platform: 'Stanford',
    language: 'English',
    is_free: true,
    rating: 4.9,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Computational Mathematics - Scientific Computing Resources
  {
    id: '79',
    title: 'Introduction to Scientific Computing with Python',
    url: 'https://github.com/jrjohansson/scientific-python-lectures',
    description: 'Comprehensive lectures on scientific computing.',
    resource_type: 'tutorial',
    class_level: 'Computational Mathematics',
    subject: 'Scientific Computing',
    thumbnail_url: null,
    author: 'Robert Johansson',
    platform: 'GitHub',
    language: 'English',
    is_free: true,
    rating: 4.8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  // Bioinformatics - Structural Bioinformatics Resources
  {
    id: '80',
    title: 'Structural Bioinformatics',
    url: 'https://www.coursera.org/learn/bioinformatics-proteins',
    description: 'Learn methods for protein structure analysis.',
    resource_type: 'course',
    class_level: 'Bioinformatics',
    subject: 'Structural Bioinformatics',
    thumbnail_url: null,
    author: 'University of California San Diego',
    platform: 'Coursera',
    language: 'English',
    is_free: true,
    rating: 4.7,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export default function Resources() {
  const resources = initialResources;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [filteredResources, setFilteredResources] = useState<EducationalResource[]>(initialResources);

  // Filter resources based on search query, faculty, and subject
  useEffect(() => {
    setLoading(true);
    const filtered = resources.filter((resource) => {
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFaculty = selectedFaculty === '' || resource.class_level === selectedFaculty;
      const matchesSubject = selectedSubject === '' || resource.subject === selectedSubject;

      return matchesSearch && matchesFaculty && matchesSubject;
    });

    // Simulate loading delay
    setTimeout(() => {
      setFilteredResources(filtered);
      setLoading(false);
    }, 500);
  }, [searchQuery, selectedFaculty, selectedSubject, resources]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Educational Resources
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <Select
                value={selectedFaculty}
                onValueChange={setSelectedFaculty}
              >
                <SelectTrigger className="w-full bg-card dark:bg-gray-800 text-foreground dark:text-gray-100 border-input hover:bg-accent dark:hover:bg-gray-700 transition-colors">
                  <SelectValue placeholder="Select a faculty" />
                </SelectTrigger>
                <SelectContent className="bg-card dark:bg-gray-800">
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty} className="text-foreground dark:text-gray-100">
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
                disabled={!selectedFaculty}
              >
                <SelectTrigger className="w-full bg-card dark:bg-gray-800 text-foreground dark:text-gray-100 border-input hover:bg-accent dark:hover:bg-gray-700 transition-colors">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent className="bg-card dark:bg-gray-800">
                  {selectedFaculty &&
                    subjectsByLevel[selectedFaculty]?.map((subject) => (
                      <SelectItem key={subject} value={subject} className="text-foreground dark:text-gray-100">
                        {subject}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card dark:bg-gray-800 text-foreground dark:text-gray-100 border-input focus:ring-primary dark:focus:ring-purple-400 transition-all"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            // Skeleton loading state with animation
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                variants={item}
                className="h-full"
              >
                <Card className="bg-card dark:bg-gray-800 border-border h-full">
                  <div className="p-6 flex items-center justify-center">
                    <Skeleton className="h-12 w-12 rounded-lg dark:bg-gray-700" />
                  </div>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 dark:bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-full dark:bg-gray-700" />
                    <Skeleton className="h-4 w-2/3 dark:bg-gray-700" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-20 dark:bg-gray-700" />
                      <Skeleton className="h-6 w-24 dark:bg-gray-700" />
                    </div>
                    <Skeleton className="h-10 w-32 dark:bg-gray-700" />
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={item}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="h-full relative group"
              >
                <Card className="bg-card dark:bg-gray-800 border-border group-hover:border-primary dark:group-hover:border-purple-400 transition-all duration-300 h-full overflow-hidden">
                  <div className="p-6 flex items-center justify-center">
                    {(() => {
                      switch (resource.resource_type) {
                        case 'video':
                          return <Video className="h-12 w-12 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />;
                        case 'tutorial':
                          return <BookOpenCheck className="h-12 w-12 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform" />;
                        case 'document':
                          return <FileText className="h-12 w-12 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform" />;
                        case 'course':
                          return <GraduationCap className="h-12 w-12 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform" />;
                        case 'book':
                          return <Book className="h-12 w-12 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform" />;
                        case 'article':
                          return <Newspaper className="h-12 w-12 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />;
                        case 'tool':
                          return <Wrench className="h-12 w-12 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />;
                        default:
                          return <BookOpen className="h-12 w-12 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform" />;
                      }
                    })()}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-card-foreground dark:text-white group-hover:text-primary dark:group-hover:text-purple-400 transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground dark:text-gray-300">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-primary dark:text-purple-400 border-primary dark:border-purple-400">
                        {resource.resource_type}
                      </Badge>
                      <Badge variant="outline" className="text-primary dark:text-purple-400 border-primary dark:border-purple-400">
                        {resource.subject}
                      </Badge>
                      {resource.is_free && (
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                          Free
                        </Badge>
                      )}
                    </div>
                    
                    {/* Additional information shown on hover */}
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: 1,
                        height: "auto",
                        transition: { duration: 0.2 }
                      }}
                      className="space-y-2 text-sm text-muted-foreground dark:text-gray-400 overflow-hidden"
                    >
                      {resource.author && (
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Author:</span> {resource.author}
                        </p>
                      )}
                      {resource.platform && (
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Platform:</span> {resource.platform}
                        </p>
                      )}
                      {resource.rating && (
                        <p className="flex items-center gap-2">
                          <span className="font-medium">Rating:</span> {resource.rating}/5
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Language:</span> {resource.language}
                      </p>
                    </motion.div>

                    <motion.a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-primary dark:text-purple-400 hover:underline group/link"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Visit Resource
                      <ExternalLink className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </motion.a>
                  </CardContent>
                </Card>

                {/* Hover overlay with quick info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}