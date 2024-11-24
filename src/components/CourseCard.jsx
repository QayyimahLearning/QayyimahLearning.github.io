import React from 'react';

const CourseCard = ({ course, index, isDarkMode, onVideoSelect }) => {
  return (
    <div className="card h-100" style={{
      background: isDarkMode ? '#1e1e1e' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: isDarkMode ? '1px solid #333' : '1px solid #dee2e6',
      boxShadow: isDarkMode ? '0 2px 15px rgba(0,0,0,0.2)' : '0 2px 15px rgba(0,0,0,0.05)'
    }}>
      <div className="card-body p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="rounded"
            style={{ 
              width: "100%", 
              maxWidth: "250px",
              height: "150px", 
              objectFit: "cover" 
            }}
          />
          <div className="flex-grow-1 text-center text-md-start">
            <div className="d-flex flex-column flex-md-row align-items-center mb-2 gap-2">
              <span 
                className={`${isDarkMode ? 'bg-light text-dark' : 'bg-dark text-white'} rounded-circle d-inline-flex align-items-center justify-content-center`}
                style={{ width: "35px", height: "35px", minWidth: "35px" }}
              >
                <span className="fw-bold">{index + 1}</span>
              </span>
              <div>
                <h5 className={`card-title mb-1 fw-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                  {course.title}
                </h5>
                <p className={`card-text mb-0 ${isDarkMode ? 'text-light' : 'text-secondary'}`}>
                  By {course.instructor}
                </p>
                <p className={`card-text small mb-0 ${isDarkMode ? 'text-light opacity-75' : 'text-muted'}`}>
                  {course.description}
                </p>
              </div>
            </div>
          </div>
          <button 
            className="btn fw-bold px-4 py-3"
            style={{ 
              borderRadius: '50px',
              background: isDarkMode 
                ? 'white'
                : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
              border: 'none',
              color: isDarkMode ? '#1e1e1e' : 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => onVideoSelect(course.link)}
          >
            START LEARNING
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 