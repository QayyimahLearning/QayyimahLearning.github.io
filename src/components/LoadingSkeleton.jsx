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
  <div className="course-card card h-100" style={{
    background: isDarkMode ? '#1e1e1e' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: isDarkMode ? '1px solid #333' : '1px solid #dee2e6',
    boxShadow: isDarkMode ? '0 2px 15px rgba(0,0,0,0.2)' : '0 2px 15px rgba(0,0,0,0.05)'
  }}>
    <div className="card-body p-3">
      <div className="d-flex flex-column align-items-center gap-3">
        {/* Image Skeleton */}
        <div 
          className="w-100"
          style={{
            height: "150px",
            background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
            borderRadius: "4px",
            animation: 'pulse 1.5s infinite'
          }}
        />
        {/* Content Skeleton */}
        <div className="text-center w-100">
          <div 
            style={{
              height: "24px",
              width: "80%",
              background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
              borderRadius: "4px",
              margin: "0 auto 8px",
              animation: 'pulse 1.5s infinite'
            }}
          />
          <div 
            style={{
              height: "18px",
              width: "60%",
              background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
              borderRadius: "4px",
              margin: "0 auto 8px",
              animation: 'pulse 1.5s infinite'
            }}
          />
          <div 
            style={{
              height: "36px",
              width: "40%",
              background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e9ecef",
              borderRadius: "50px",
              margin: "16px auto 0",
              animation: 'pulse 1.5s infinite'
            }}
          />
        </div>
      </div>
    </div>
  </div>
);