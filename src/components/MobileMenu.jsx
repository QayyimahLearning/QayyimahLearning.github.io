import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const LANGUAGE_LABEL = {
  ml: 'മലയാളം',
  en: 'English',
  ar: 'عربي'
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'ml'
  );

  const handleClose = () => setIsOpen(false);

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage === language) return;
    
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
    // Dispatch custom event instead of page reload
    window.dispatchEvent(new Event('languageChange'));
  };

  return (
    <>
      <div className="mobile-menu-container">
        <button 
          className="hamburger-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
      </div>

      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
        onClick={handleClose}
      />

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button 
          className="mobile-menu-close"
          onClick={handleClose}
          aria-label="Close menu"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="mobile-menu-item">
          <span className="mobile-menu-label">Theme</span>
          <button 
            onClick={toggleTheme}
            className="btn"
            style={{
              background: isDarkMode 
                ? 'white'
                : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
              color: isDarkMode ? '#1e1e1e' : 'white',
              border: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {isDarkMode ? (
              <i className="bi bi-sun-fill"></i>
            ) : (
              <i className="bi bi-moon-fill"></i>
            )}
          </button>
        </div>

        <div className="mobile-menu-item">
          <span className="mobile-menu-label">Language</span>
          <div className="d-flex flex-column gap-2">
            {Object.entries(LANGUAGE_LABEL).map(([code, label]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`btn ${code === language ? 'active' : ''}`}
                style={{
                  background: code === language
                    ? (isDarkMode ? 'white' : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)')
                    : 'transparent',
                  color: code === language
                    ? (isDarkMode ? '#1e1e1e' : 'white')
                    : (isDarkMode ? 'white' : '#2c3e50'),
                  border: code === language ? 'none' : '1px solid currentColor',
                  transition: 'all 0.3s ease'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;