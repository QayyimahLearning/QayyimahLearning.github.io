import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const CourseCard = ({ course, index, isDarkMode, onVideoSelect }) => {
  const { trackEvent } = useAnalytics();

  const handleVideoSelect = () => {
    trackEvent('video_play', {
      course_title: course.title,
      course_instructor: course.instructor,
      course_index: index,
      video_link: course.link
    });
    onVideoSelect(course.link);
  };

  return (
    <div className="course-card card h-100" style={{
      background: isDarkMode ? '#1e1e1e' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: isDarkMode ? '1px solid #333' : '1px solid #dee2e6',
      boxShadow: isDarkMode ? '0 2px 15px rgba(0,0,0,0.2)' : '0 2px 15px rgba(0,0,0,0.05)'
    }}>
      <div className="card-body p-3">
        <div className="d-flex flex-column align-items-center gap-3">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="rounded w-100"
            style={{ 
              aspectRatio: "16/9",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />

          <div className="text-center w-100">
            <div className="d-flex align-items-center mb-2 gap-2">
              <span 
                className={`${isDarkMode ? 'bg-light text-dark' : 'bg-dark text-white'} rounded-circle d-inline-flex align-items-center justify-content-center mx-3`}
                style={{ width: "35px", height: "35px", minWidth: "35px" }}
              >
                <span className="fw-bold">{index + 1}</span>
              </span>
              <div className="text-start">
                <h5 
                  className={`card-title mb-1 fw-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}
                  style={{ 
                    minHeight: '48px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '24px'
                  }}
                >
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
            onClick={handleVideoSelect}
          >
            START LEARNING
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 