import React from 'react';

export const HeaderSkeleton = ({ isDarkMode }) => (
  <div className="text-center">
    <div 
      className="mb-2" 
      style={{
        height: "2rem",
        width: "200px",
        background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
        borderRadius: "4px",
        margin: "0 auto",
        animation: 'pulse 1.5s infinite'
      }}
    />
    <div 
      style={{
        height: "1.5rem",
        width: "150px",
        background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
        borderRadius: "4px",
        margin: "0 auto",
        animation: 'pulse 1.5s infinite'
      }}
    />
  </div>
);

export const CourseCardSkeleton = ({ isDarkMode }) => (
  <div className="card h-100" style={{
    background: isDarkMode ? '#1e1e1e' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: isDarkMode ? '1px solid #333' : '1px solid #dee2e6',
    boxShadow: isDarkMode ? '0 2px 15px rgba(0,0,0,0.2)' : '0 2px 15px rgba(0,0,0,0.05)'
  }}>
    <div className="card-body p-3 p-md-4">
      <div className="d-flex flex-column flex-md-row align-items-center gap-3">
        {/* Image Skeleton */}
        <div 
          style={{
            width: "250px",
            height: "150px",
            background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
            borderRadius: "4px",
            animation: 'pulse 1.5s infinite'
          }}
        />
        
        {/* Content Skeleton */}
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 mb-3">
            {/* Number Circle Skeleton */}
            <div 
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
                animation: 'pulse 1.5s infinite'
              }}
            />
            
            {/* Title and Description Skeletons */}
            <div className="flex-grow-1">
              <div 
                className="mb-2"
                style={{
                  height: "24px",
                  width: "70%",
                  background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
                  borderRadius: "4px",
                  animation: 'pulse 1.5s infinite'
                }}
              />
              <div 
                className="mb-2"
                style={{
                  height: "18px",
                  width: "40%",
                  background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
                  borderRadius: "4px",
                  animation: 'pulse 1.5s infinite'
                }}
              />
              <div 
                style={{
                  height: "16px",
                  width: "90%",
                  background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
                  borderRadius: "4px",
                  animation: 'pulse 1.5s infinite'
                }}
              />
            </div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div 
          style={{
            width: "150px",
            height: "48px",
            background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
            borderRadius: "50px",
            animation: 'pulse 1.5s infinite'
          }}
        />
      </div>
    </div>
  </div>
);

export default {
  HeaderSkeleton,
  CourseCardSkeleton
}; 