import React from 'react';
import { motion } from "framer-motion";
import { HeaderSkeleton } from './LoadingSkeleton';

const ProgramHeader = ({ 
  isDarkMode, 
  isLoading, 
  activeProgram, 
  programs, 
  setActiveProgram, 
  getPrevProgram, 
  getNextProgram 
}) => {
  const programKeys = programs ? Object.keys(programs) : [];

  return (
    <header className="mb-5" style={{ 
      background: isDarkMode 
        ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
      padding: '2rem',
      borderRadius: '10px',
      color: 'white',
      boxShadow: isDarkMode 
        ? '0 4px 20px rgba(0,0,0,0.3)'
        : '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn text-white"
          onClick={getPrevProgram}
          disabled={isLoading}
          style={{ visibility: isLoading ? 'hidden' : 'visible' }}
        >
          <i className="bi bi-chevron-left fs-4"></i>
        </button>

        {isLoading ? (
          <HeaderSkeleton isDarkMode={isDarkMode} />
        ) : (
          <div className="text-center">
            <motion.h1
              key={`title-${activeProgram}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="m-0"
              style={{ fontSize: "1.75rem" }}
            >
              {programs?.[activeProgram]?.pTitle}
            </motion.h1>
            
            <motion.p
              key={`desc-${activeProgram}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="m-0 mt-2"
              style={{ fontSize: "1.1rem" }}
            >
              {programs?.[activeProgram]?.pDescription}
            </motion.p>
          </div>
        )}

        <button
          className="btn text-white"
          onClick={getNextProgram}
          disabled={isLoading}
          style={{ visibility: isLoading ? 'hidden' : 'visible' }}
        >
          <i className="bi bi-chevron-right fs-4"></i>
        </button>
      </div>

      <div className="d-flex justify-content-center gap-2 mt-3">
        {programKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveProgram(key)}
            className="btn p-0"
            style={{ width: '10px', height: '10px' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'white',
                opacity: activeProgram === key ? 1 : 0.5,
                transition: 'opacity 0.3s ease'
              }}
            />
          </button>
        ))}
      </div>

      <hr 
        className="mx-auto" 
        style={{ 
          width: "200px", 
          height: "2px", 
          opacity: isDarkMode ? "0.3" : "0.5", 
          backgroundColor: "white" 
        }} 
      />
    </header>
  );
};

export default ProgramHeader; 