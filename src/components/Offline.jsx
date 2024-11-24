import React from 'react';

const Offline = ({ isDarkMode }) => {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div 
        className="text-center p-4 rounded-4"
        style={{
          background: isDarkMode ? '#1e1e1e' : '#f8f9fa',
          boxShadow: isDarkMode 
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <i 
          className="bi bi-wifi-off display-1 mb-3"
          style={{ color: isDarkMode ? '#fff' : '#2c3e50' }}
        ></i>
        <h2 
          className="mb-3"
          style={{ color: isDarkMode ? '#fff' : '#2c3e50' }}
        >
          No Internet Connection
        </h2>
        <p 
          className="mb-4"
          style={{ color: isDarkMode ? '#ccc' : '#6c757d' }}
        >
          Please check your internet connection and try again
        </p>
        <button
          className="btn fw-bold px-4 py-2"
          onClick={() => window.location.reload()}
          style={{
            background: isDarkMode 
              ? '#fff' 
              : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
            color: isDarkMode ? '#1e1e1e' : '#fff',
            border: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Offline; 