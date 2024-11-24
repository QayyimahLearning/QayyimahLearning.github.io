import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';
import InstallPrompt from '../InstallPrompt';
import Navbar from './Navbar';

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
    <div className={`container my-4 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <ThemeToggle />
      
      {showInstallPrompt && (
        <InstallPrompt 
          isDarkMode={isDarkMode}
          isIOS={isIOS}
          handleInstallClick={handleInstallClick}
          onClose={() => setShowInstallPrompt(false)}
        />
      )}

      <div className="container my-4">
        <Navbar 
          isDarkMode={isDarkMode}
          logoLight={logoLight}
          logoDark={logoDark}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout; 