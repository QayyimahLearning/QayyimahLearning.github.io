import React from 'react';

const LEVELS = ['basic', 'intermediate', 'advanced'];

const LevelSelector = ({ 
  isDarkMode, 
  activeLevel, 
  setActiveLevel,
}) => {
  const handlePrevLevel = () => {
    const currentIndex = LEVELS.indexOf(activeLevel);
    if (currentIndex > 0) {
      setActiveLevel(LEVELS[currentIndex - 1]);
    }
  };

  const handleNextLevel = () => {
    const currentIndex = LEVELS.indexOf(activeLevel);
    if (currentIndex < LEVELS.length - 1) {
      setActiveLevel(LEVELS[currentIndex + 1]);
    }
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
      
      <button
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
      </button>

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