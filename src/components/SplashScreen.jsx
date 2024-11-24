import React from 'react';
import { motion } from "framer-motion";

const SplashScreen = ({ isDarkMode, animationLogoDark, animationLogoLight }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="splash-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDarkMode ? '#121212' : '#ffffff',
        zIndex: 9999
      }}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ 
          scale: 0,
          transition: { 
            duration: 0.5,
            delay: 1.5
          }
        }}
      >
        <img 
          src={isDarkMode ? animationLogoLight : animationLogoDark}
          alt="Logo"
          style={{ 
            height: window.innerWidth <= 768 ? '150px' : '300px',
            width: 'auto'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen; 