import React from 'react';
import { motion } from "framer-motion";

const InstallPrompt = ({ 
  isDarkMode, 
  isIOS, 
  handleInstallClick, 
  onClose 
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="install-prompt position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-3 rounded-4 d-flex align-items-center gap-3"
      style={{
        background: isDarkMode ? '#2d2d2d' : 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        maxWidth: '90%',
        width: '400px',
        zIndex: 1000,
      }}
    >
      <div className="flex-grow-1">
        <p className="mb-1 fw-bold" style={{ color: isDarkMode ? 'white' : '#2c3e50' }}>
          Install Qayyima App
        </p>
        <p className="mb-0 small" style={{ color: isDarkMode ? '#ccc' : '#666' }}>
          {isIOS ? 
            'Tap the share button and select "Add to Home Screen"' :
            'Install our app for a better experience'
          }
        </p>
      </div>
      {!isIOS && (
        <button
          className="btn fw-bold px-3 py-2"
          onClick={handleInstallClick}
          style={{
            background: isDarkMode ? 'white' : '#2c3e50',
            color: isDarkMode ? '#2c3e50' : 'white',
            border: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Install
        </button>
      )}
      <button
        className="btn-close position-absolute top-0 end-0 mt-2 me-2"
        onClick={onClose}
        style={{
          opacity: 0.5,
          transform: 'scale(0.8)',
        }}
      />
    </motion.div>
  );
};

export default InstallPrompt; 