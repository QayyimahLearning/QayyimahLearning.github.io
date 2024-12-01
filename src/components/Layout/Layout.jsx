import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';
import InstallPrompt from '../InstallPrompt';
import NotificationCenter from '../NotificationCenter';

const Layout = ({ 
  children, 
  showInstallPrompt,
  isIOS,
  handleInstallClick,
  setShowInstallPrompt,
  logoLight,
  logoDark
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <header className="position-relative" style={{ zIndex: 1000 }}>
        <div className="d-flex justify-content-between align-items-center py-3" 
          style={{ 
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 24px',
            gap: '1rem'
          }}>
          <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
            <img 
              src={isDarkMode ? logoLight : logoDark}
              alt="Logo"
              style={{ 
                height: '40px',
                width: 'auto'
              }}
            />
            <p 
              className="mb-0 text-uppercase"
              style={{ 
                letterSpacing: '0.5px', 
                fontSize: '0.55rem',
                color: isDarkMode ? '#fff' : '#2c3e50',
                whiteSpace: 'nowrap'
              }}
            >
              Student Journey | Learn Islam
            </p>
          </div>
          <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
            <NotificationCenter isDarkMode={isDarkMode} />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <div className="container my-4">
        {showInstallPrompt && (
          <InstallPrompt 
            isDarkMode={isDarkMode}
            isIOS={isIOS}
            handleInstallClick={handleInstallClick}
            onClose={() => setShowInstallPrompt(false)}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout; 