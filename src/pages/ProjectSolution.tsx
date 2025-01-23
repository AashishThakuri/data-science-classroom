import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CodeBracketIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

type Solution = {
  title: string;
  description: string;
  resources: {
    title: string;
    url: string;
    type: 'github' | 'tutorial' | 'documentation' | 'course';
  }[];
};

const availableSolutions: Record<string, Solution> = {
  'data-science/1/python-analysis': {
    title: 'Python for Data Analysis',
    description: 'Learn data analysis using Python with real-world examples and datasets.',
    resources: [
      {
        title: 'Python Data Analysis Tutorial',
        url: 'https://github.com/wesm/pydata-book',
        type: 'github'
      },
      {
        title: 'Pandas Documentation',
        url: 'https://pandas.pydata.org/docs/',
        type: 'documentation'
      },
      {
        title: 'Data Analysis with Python Course',
        url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
        type: 'course'
      }
    ]
  },
  'data-science/1/r-statistics': {
    title: 'Statistical Computing with R',
    description: 'Learn statistical analysis and visualization using R programming.',
    resources: [
      {
        title: 'R for Data Science',
        url: 'https://r4ds.had.co.nz/',
        type: 'tutorial'
      },
      {
        title: 'Statistical Learning with R',
        url: 'https://www.statlearning.com/',
        type: 'course'
      }
    ]
  },
  'bio-informatics/1/genomic-analysis': {
    title: 'Genomic Data Analysis',
    description: 'Learn to analyze DNA sequencing data using modern bioinformatics tools.',
    resources: [
      {
        title: 'Bioinformatics Algorithms',
        url: 'https://bioinformaticsalgorithms.com/',
        type: 'course'
      },
      {
        title: 'Biopython Tutorial',
        url: 'https://biopython.org/DIST/docs/tutorial/Tutorial.html',
        type: 'documentation'
      },
      {
        title: 'Genomic Data Science Specialization',
        url: 'https://www.coursera.org/specializations/genomic-data-science',
        type: 'course'
      }
    ]
  },
  'bio-informatics/1/protein-structure': {
    title: 'Protein Structure Prediction',
    description: 'Learn about protein structure prediction methods and tools.',
    resources: [
      {
        title: 'PyMOL Tutorial',
        url: 'https://pymol.org/tutorials/',
        type: 'tutorial'
      },
      {
        title: 'Protein Structure Analysis Repository',
        url: 'https://github.com/biopython/biopython/tree/master/Bio/PDB',
        type: 'github'
      },
      {
        title: 'Structural Bioinformatics Course',
        url: 'https://www.coursera.org/learn/bioinformatics-proteins',
        type: 'course'
      }
    ]
  },
  'bio-informatics/2/sequence-alignment': {
    title: 'Sequence Alignment',
    description: 'Learn and implement sequence alignment algorithms for biological data.',
    resources: [
      {
        title: 'BLAST Documentation',
        url: 'https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs',
        type: 'documentation'
      },
      {
        title: 'Sequence Alignment Algorithms',
        url: 'https://github.com/zhanglab/pairwise2',
        type: 'github'
      },
      {
        title: 'Bioinformatics Specialization',
        url: 'https://www.coursera.org/specializations/bioinformatics',
        type: 'course'
      }
    ]
  },
  'computational-math/1/numerical-methods': {
    title: 'Numerical Methods',
    description: 'Implementation of numerical methods for solving mathematical problems.',
    resources: [
      {
        title: 'Numerical Methods in Python',
        url: 'https://github.com/numerical-methods/numerical-methods-python',
        type: 'github'
      },
      {
        title: 'Numerical Methods Course',
        url: 'https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/',
        type: 'course'
      },
      {
        title: 'SciPy Documentation',
        url: 'https://docs.scipy.org/doc/scipy/reference/tutorial/index.html',
        type: 'documentation'
      }
    ]
  },
  'computational-math/1/optimization': {
    title: 'Optimization Algorithms',
    description: 'Learn and implement various optimization algorithms for mathematical problems.',
    resources: [
      {
        title: 'Optimization with Python',
        url: 'https://github.com/HIPS/autograd',
        type: 'github'
      },
      {
        title: 'Convex Optimization Course',
        url: 'https://www.edx.org/course/convex-optimization',
        type: 'course'
      },
      {
        title: 'Optimization Methods Tutorial',
        url: 'https://www.scipy-lectures.org/advanced/mathematical_optimization/',
        type: 'tutorial'
      }
    ]
  },
  'computational-math/2/differential-equations': {
    title: 'Differential Equations',
    description: 'Numerical solutions of differential equations using computational methods.',
    resources: [
      {
        title: 'Differential Equations with Python',
        url: 'https://github.com/scipy/scipy/tree/master/scipy/integrate',
        type: 'github'
      },
      {
        title: 'MIT Differential Equations Course',
        url: 'https://ocw.mit.edu/courses/mathematics/18-03sc-differential-equations-fall-2011/',
        type: 'course'
      },
      {
        title: 'SciPy ODE Documentation',
        url: 'https://docs.scipy.org/doc/scipy/reference/integrate.html',
        type: 'documentation'
      }
    ]
  }
};

const ProjectSolution = () => {
  const navigate = useNavigate();
  const { faculty, semester, projectId } = useParams();
  const solutionPath = `${faculty}/${semester}/${projectId}`;
  const solution = availableSolutions[solutionPath];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'github':
        return <CodeBracketIcon className="w-6 h-6" />;
      case 'tutorial':
        return <DocumentTextIcon className="w-6 h-6" />;
      case 'documentation':
        return <DocumentTextIcon className="w-6 h-6" />;
      case 'course':
        return <AcademicCapIcon className="w-6 h-6" />;
      default:
        return <DocumentTextIcon className="w-6 h-6" />;
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (!solution) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/app/projects')}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Projects
        </motion.button>
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-6 rounded-lg"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 text-2xl">⚠️</div>
            <div className="ml-3">
              <p className="text-yellow-700 dark:text-yellow-200 text-lg">
                This solution is currently under development. Please check back later!
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/app/projects')}
        className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Projects
      </motion.button>

      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        {solution.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 dark:text-gray-300 mb-8 text-lg"
      >
        {solution.description}
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Available Resources</h2>
        <div className="space-y-4">
          {solution.resources.map((resource, index) => (
            <motion.a
              key={index}
              variants={item}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors transform hover:-translate-y-1 hover:shadow-md duration-200 bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="text-purple-600 dark:text-purple-400">
                  {getIconForType(resource.type)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-1">{resource.type}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectSolution;
