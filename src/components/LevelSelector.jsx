import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAnalytics } from '../hooks/useAnalytics';

const LEVELS = ['basic', 'intermediate', 'advanced'];

const LevelSelector = ({ isDarkMode, activeLevel, setActiveLevel }) => {
  const controls = useAnimation();
  const { trackEvent } = useAnalytics();

  const handleLevelChange = (newLevel) => {
    trackEvent('level_change', {
      from_level: activeLevel,
      to_level: newLevel,
      method: 'button_click'
    });
    setActiveLevel(newLevel);
  };

  const handlePrevLevel = () => {
    const currentIndex = LEVELS.indexOf(activeLevel);
    if (currentIndex > 0) {
      handleLevelChange(LEVELS[currentIndex - 1]);
    }
  };

  const handleNextLevel = () => {
    const currentIndex = LEVELS.indexOf(activeLevel);
    if (currentIndex < LEVELS.length - 1) {
      handleLevelChange(LEVELS[currentIndex + 1]);
    }
  };

  const handleDragEnd = async (event, info) => {
    const SWIPE_THRESHOLD = 50;
    if (info.offset.x > SWIPE_THRESHOLD && activeLevel !== 'basic') {
      handleLevelChange(LEVELS[LEVELS.indexOf(activeLevel) - 1]);
    } else if (info.offset.x < -SWIPE_THRESHOLD && activeLevel !== 'advanced') {
      handleLevelChange(LEVELS[LEVELS.indexOf(activeLevel) + 1]);
    }
    // Reset position
    await controls.start({ x: 0 });
  };

  return (
    <div className="text-center mb-4 d-flex justify-content-center align-items-center gap-3">
      <button
        className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} px-3`}
        onClick={handlePrevLevel}
        disabled={activeLevel === 'basic'}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      
      <motion.button
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        className={`btn fw-bold px-4 px-md-5 text-uppercase`}
        style={{
          minWidth: '180px',
          transition: 'all 0.3s ease',
          background: isDarkMode 
            ? 'white'
            : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
          border: 'none',
          color: isDarkMode ? '#1e1e1e' : 'white',
          boxShadow: isDarkMode 
            ? '0 4px 15px rgba(0,0,0,0.3)'
            : '0 4px 15px rgba(0,0,0,0.1)'
        }}
      >
        {activeLevel}
      </motion.button>

      <button
        className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} px-3`}
        onClick={handleNextLevel}
        disabled={activeLevel === 'advanced'}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default LevelSelector; 