import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BeakerIcon, CalculatorIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import "@/styles/theme.css";

// Define types for the project structure
type Project = {
  id: string;
  title: string;
  description: string;
  solution: string;
};

type Faculty = {
  name: string;
  semesters: {
    [key: number]: Project[];
  };
};

type Projects = {
  [key: string]: Faculty;
};

const projects: Projects = {
  dataScience: {
    name: "Data Science",
    semesters: {
      1: [
        {
          id: 'ds-1-1',
          title: 'Python for Data Analysis',
          description: 'Build data analysis pipelines using Python, Pandas, and NumPy.',
          solution: 'data-science/1/python-analysis',
        },
        {
          id: 'ds-1-2',
          title: 'Statistical Computing with R',
          description: 'Implement statistical methods and visualizations using R.',
          solution: 'data-science/1/r-statistics',
        },
        {
          id: 'ds-1-3',
          title: 'Data Visualization',
          description: 'Create interactive dashboards using Plotly and D3.js.',
          solution: 'data-science/1/data-visualization',
        }
      ],
      2: [
        {
          id: 'ds-2-1',
          title: 'Machine Learning Fundamentals',
          description: 'Implement basic ML algorithms from scratch.',
          solution: 'data-science/2/ml-fundamentals',
        },
        {
          id: 'ds-2-2',
          title: 'Deep Learning Projects',
          description: 'Build neural networks using PyTorch and TensorFlow.',
          solution: 'data-science/2/deep-learning',
        },
        {
          id: 'ds-2-3',
          title: 'Time Series Analysis',
          description: 'Analyze and forecast time series data.',
          solution: 'data-science/2/time-series',
        }
      ]
    }
  },
  bioInformatics: {
    name: "Bio Informatics",
    semesters: {
      1: [
        {
          id: 'bi-1-1',
          title: 'Genomic Data Analysis',
          description: 'Process and analyze DNA sequencing data.',
          solution: 'bio-informatics/1/genomic-analysis',
        },
        {
          id: 'bi-1-2',
          title: 'Protein Structure Prediction',
          description: 'Implement algorithms for protein structure prediction.',
          solution: 'bio-informatics/1/protein-structure',
        },
        {
          id: 'bi-1-3',
          title: 'Biological Database Design',
          description: 'Design and implement databases for biological data.',
          solution: 'bio-informatics/1/bio-database',
        }
      ],
      2: [
        {
          id: 'bi-2-1',
          title: 'Sequence Alignment',
          description: 'Implement sequence alignment algorithms.',
          solution: 'bio-informatics/2/sequence-alignment',
        },
        {
          id: 'bi-2-2',
          title: 'Phylogenetic Analysis',
          description: 'Build phylogenetic trees from molecular data.',
          solution: 'bio-informatics/2/phylogenetics',
        },
        {
          id: 'bi-2-3',
          title: 'Gene Expression Analysis',
          description: 'Analyze RNA-seq data for gene expression.',
          solution: 'bio-informatics/2/gene-expression',
        }
      ]
    }
  },
  computationalMath: {
    name: "Computational Mathematics",
    semesters: {
      1: [
        {
          id: 'cm-1-1',
          title: 'Numerical Methods',
          description: 'Implement numerical methods for solving equations.',
          solution: 'computational-math/1/numerical-methods',
        },
        {
          id: 'cm-1-2',
          title: 'Optimization Algorithms',
          description: 'Implement various optimization algorithms.',
          solution: 'computational-math/1/optimization',
        },
        {
          id: 'cm-1-3',
          title: 'Linear Algebra Computations',
          description: 'Implement matrix operations and eigenvalue algorithms.',
          solution: 'computational-math/1/linear-algebra',
        }
      ],
      2: [
        {
          id: 'cm-2-1',
          title: 'Differential Equations',
          description: 'Solve differential equations numerically.',
          solution: 'computational-math/2/differential-equations',
        },
        {
          id: 'cm-2-2',
          title: 'Scientific Computing',
          description: 'High-performance computing for mathematical problems.',
          solution: 'computational-math/2/scientific-computing',
        },
        {
          id: 'cm-2-3',
          title: 'Computational Geometry',
          description: 'Implement geometric algorithms and visualizations.',
          solution: 'computational-math/2/computational-geometry',
        }
      ]
    }
  }
};

const getFacultyIcon = (faculty: string) => {
  switch (faculty) {
    case 'dataScience':
      return <ChartBarIcon className="w-6 h-6" />;
    case 'bioInformatics':
      return <BeakerIcon className="w-6 h-6" />;
    case 'computationalMath':
      return <CalculatorIcon className="w-6 h-6" />;
    default:
      return null;
  }
};

const Projects = () => {
  const navigate = useNavigate();
  const [selectedFaculty, setSelectedFaculty] = useState<string>('dataScience');
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const handleProjectClick = (solution: string) => {
    navigate(`/app/projects/${solution}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-blue-600 dark:text-purple-500"
      >
        Academic Projects
      </motion.h1>
      
      {/* Faculty Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Select Faculty:</h2>
        <motion.div
          className="flex gap-4 flex-wrap justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Object.entries(projects).map(([key, faculty], index) => (
            <motion.button
              key={key}
              onClick={() => setSelectedFaculty(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition-colors ${
                selectedFaculty === key
                  ? 'bg-blue-600 dark:bg-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className={selectedFaculty === key ? 'text-white' : 'text-blue-600 dark:text-purple-400'}>
                {getFacultyIcon(key)}
              </span>
              {faculty.name}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Semester Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Select Semester:</h2>
        <motion.div
          className="flex gap-3 flex-wrap justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {Object.keys(projects[selectedFaculty].semesters).map((sem, index) => (
            <motion.button
              key={sem}
              onClick={() => setSelectedSemester(Number(sem))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-5 py-2 rounded-lg shadow-md transition-colors ${
                selectedSemester === Number(sem)
                  ? 'bg-blue-600 dark:bg-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Semester {sem}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Projects List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedFaculty}-${selectedSemester}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects[selectedFaculty].semesters[selectedSemester].map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleProjectClick(project.solution)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Project
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;