import React from 'react';

const Navbar = ({ isDarkMode, logoLight, logoDark }) => {
  return (
    <nav className="d-flex align-items-center mb-4">
      <img 
        src={isDarkMode ? logoLight : logoDark}
        alt="Logo"
        style={{ 
          height: '50px',
          width: 'auto'
        }}
      />
      <p 
        className="mb-0 text-uppercase"
        style={{ 
          letterSpacing: '0.5px', 
          fontSize: '0.55rem',
          color: isDarkMode ? '#fff' : '#2c3e50'
        }}
      >
        Student Journey | Learn Islam
      </p>
    </nav>
  );
};

export default Navbar; 