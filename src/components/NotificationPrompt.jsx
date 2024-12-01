import React from 'react';
import { motion } from 'framer-motion';

const NotificationPrompt = ({ isDarkMode, onAccept, onDecline }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="notification-prompt position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-3 rounded-4 d-flex align-items-center gap-3"
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
          Enable Notifications
        </p>
        <p className="mb-0 small" style={{ color: isDarkMode ? '#ccc' : '#666' }}>
          Stay updated with new courses and features
        </p>
      </div>
      <div className="d-flex gap-2">
        <button
          className="btn btn-sm"
          onClick={onDecline}
          style={{
            color: isDarkMode ? '#ccc' : '#666',
          }}
        >
          Later
        </button>
        <button
          className="btn btn-sm fw-bold px-3 py-2"
          onClick={onAccept}
          style={{
            background: isDarkMode ? 'white' : '#2c3e50',
            color: isDarkMode ? '#2c3e50' : 'white',
          }}
        >
          Enable
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationPrompt; 