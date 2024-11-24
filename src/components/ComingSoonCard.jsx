import React from 'react';

const ComingSoonCard = ({ isDarkMode }) => {
  return (
    <div className="card h-100" style={{
      background: isDarkMode ? '#1e1e1e' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: isDarkMode ? '1px solid #333' : '1px solid #dee2e6',
      boxShadow: isDarkMode ? '0 2px 15px rgba(0,0,0,0.2)' : '0 2px 15px rgba(0,0,0,0.05)'
    }}>
      <div className="card-body p-5">
        <i className="bi bi-clock-history fs-1 mb-3"></i>
        <h3 className={`fw-bold ${isDarkMode ? 'text-light' : 'text-dark'}`}>Coming Soon</h3>
        <p className={`mb-0 ${isDarkMode ? 'text-light opacity-75' : 'text-muted'}`}>
          We're working on adding new courses for this level.
        </p>
      </div>
    </div>
  );
};

export default ComingSoonCard; 