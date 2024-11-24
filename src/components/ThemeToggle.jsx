import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        background: 'none',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        zIndex: 1000,
        color: isDarkMode ? '#fff' : '#2c3e50'
      }}
    >
      {isDarkMode ? (
        <i className="bi bi-sun-fill fs-4"></i>
      ) : (
        <i className="bi bi-moon-fill fs-4"></i>
      )}
    </button>
  );
};

export default ThemeToggle; 