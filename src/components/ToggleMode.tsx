'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ToggleMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <motion.div
      className="fixed right-4 top-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-500" />
        )}
      </motion.button>
    </motion.div>
  );
};

export default ToggleMode;
