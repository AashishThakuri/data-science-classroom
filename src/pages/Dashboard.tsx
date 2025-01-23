import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { Clock, Target, Zap, Beaker, Calculator, BarChart3, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProfile } from '@/components/UserProfile';
import ToggleMode from '@/components/ToggleMode';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

type FacultyType = 'data-science' | 'bioinformatics' | 'computational-math';

interface Resource {
  title: string;
  description: string;
  level: string;
  duration: string;
  icon?: string;
  link: string;
}

interface Skill {
  name: string;
  level: string;
}

interface FacultyResources {
  courses: Resource[];
  skills: Skill[];
}

const recommendations: { [key in FacultyType]: FacultyResources } = {
  'data-science': {
    courses: [
      {
        title: "Python for Data Analysis",
        description: "Master data manipulation and analysis with Pandas",
        level: "Beginner",
        duration: "8 weeks",
        link: "https://www.coursera.org/learn/python-data-analysis"
      },
      {
        title: "Machine Learning Fundamentals",
        description: "Learn core ML algorithms and implementations",
        level: "Intermediate",
        duration: "12 weeks",
        link: "https://www.coursera.org/learn/machine-learning"
      }
    ],
    skills: [
      { name: "Python", level: "Essential" },
      { name: "Data Analysis", level: "Core" },
      { name: "Machine Learning", level: "Advanced" },
      { name: "SQL", level: "Essential" },
      { name: "Data Visualization", level: "Core" }
    ]
  },
  'bioinformatics': {
    courses: [
      {
        title: "Genomic Data Science",
        description: "Learn to analyze genomic data",
        level: "Beginner",
        duration: "10 weeks",
        link: "https://www.coursera.org/learn/genomic-data-science"
      },
      {
        title: "Bioinformatics Algorithms",
        description: "Master computational biology algorithms",
        level: "Intermediate",
        duration: "12 weeks",
        link: "https://www.coursera.org/learn/bioinformatics"
      }
    ],
    skills: [
      { name: "R Programming", level: "Essential" },
      { name: "Genomics", level: "Core" },
      { name: "Biostatistics", level: "Core" },
      { name: "Python", level: "Essential" },
      { name: "Sequence Analysis", level: "Advanced" }
    ]
  },
  'computational-math': {
    courses: [
      {
        title: "Numerical Methods",
        description: "Solve mathematical problems computationally",
        level: "Beginner",
        duration: "8 weeks",
        link: "https://www.coursera.org/learn/numerical-methods"
      },
      {
        title: "Optimization Techniques",
        description: "Advanced optimization algorithms",
        level: "Advanced",
        duration: "12 weeks",
        link: "https://www.coursera.org/learn/optimization"
      }
    ],
    skills: [
      { name: "MATLAB", level: "Essential" },
      { name: "Linear Algebra", level: "Core" },
      { name: "Calculus", level: "Core" },
      { name: "Python Scientific Stack", level: "Essential" },
      { name: "Algorithm Design", level: "Advanced" }
    ]
  }
};

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, loading: statsLoading } = useUserStats();
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const userFaculty = (user?.user_metadata?.faculty as FacultyType) || 'data-science';

  useEffect(() => {
    // Show celebration animation when score increases
    if (stats?.score > 0) {
      const timer = setTimeout(() => {}, 2000);
      return () => clearTimeout(timer);
    }
  }, [stats?.score]);

  // Auto-rotate courses every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourseIndex((prevIndex) => {
        const maxIndex = recommendations[userFaculty].courses.length - 1;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [userFaculty]);

  if (statsLoading) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-pulse space-y-8">
            <div className="h-40 bg-white/50 rounded-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 bg-white/50 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-200 via-purple-100 to-pink-200 dark:from-indigo-950 dark:via-purple-900 dark:to-pink-900">
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <ToggleMode />
        <motion.div variants={itemVariants}>
          <UserProfile />
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-500 dark:text-purple-300" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Recommended Course</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">
                  {recommendations[userFaculty].courses[currentCourseIndex].icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {recommendations[userFaculty].courses[currentCourseIndex].title}
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-300">
                    {recommendations[userFaculty].courses[currentCourseIndex].description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {recommendations[userFaculty].courses[currentCourseIndex].level}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {recommendations[userFaculty].courses[currentCourseIndex].duration}
                </span>
                {recommendations[userFaculty].courses[currentCourseIndex]?.link && (
                  <a href={recommendations[userFaculty].courses[currentCourseIndex]?.link} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300">
                    View Course
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-card dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Zap className="w-6 h-6 text-purple-500 dark:text-purple-300" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Essential Skills for {userFaculty}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations[userFaculty].skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted dark:bg-gray-700">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    skill.level === 'Essential' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                    skill.level === 'Core' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                    'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                  }`}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}