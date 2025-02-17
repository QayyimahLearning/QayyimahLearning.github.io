import React, { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const LanguageToggle = () => {
  const { trackEvent } = useAnalytics();
  const [showDropdown, setShowDropdown] = useState(false);
  const [language, setLanguage] = React.useState(
    localStorage.getItem('language') || 'ml'
  );

  const LANGUAGE_LABEL = {
    ml: 'മലയാളം',
    en: 'English',
    ar: 'عربي'
  };

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage === language) return;
    
    trackEvent('language_change', {
      from_language: language,
      to_language: newLanguage,
      method: 'dropdown_select'
    });

    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
    setShowDropdown(false);
    
    window.dispatchEvent(new Event('languageChange'));
  };

  return (
    <div className="position-relative">
      <button 
        className="language-toggle-btn"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Toggle language"
        aria-expanded={showDropdown}
        style={{
          background: 'none',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}
      >
        {LANGUAGE_LABEL[language]}
      </button>
      
      {showDropdown && (
        <>
          <div 
            className="position-fixed top-0 start-0 w-100 h-100"
            onClick={() => setShowDropdown(false)}
            style={{ zIndex: 999 }}
          />
          <div 
            className="position-absolute language-dropdown"
            style={{
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              background: 'var(--bs-body-bg)',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              zIndex: 1000,
              minWidth: '120px'
            }}
          >
            {Object.entries(LANGUAGE_LABEL).map(([code, label]) => (
              <button
                key={code}
                className={`w-100 text-start px-3 py-2 language-option ${code === language ? 'active' : ''}`}
                onClick={() => handleLanguageChange(code)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;
