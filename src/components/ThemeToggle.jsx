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
        position: 'relative',
        background: 'none',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        color: isDarkMode ? '#fff' : '#2c3e50'
      }}
    >
      {isDarkMode ? (
        <i className="bi bi-sun-fill fs-5"></i>
      ) : (
        <i className="bi bi-moon-fill fs-5"></i>
      )}
    </button>
  );
};

export default ThemeToggle; 