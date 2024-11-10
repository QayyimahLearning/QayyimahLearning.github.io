import React, { useState, useEffect } from "react";
import { Modal } from 'react-responsive-modal';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-responsive-modal/styles.css';

import "./assets/css/App.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a saved preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [activeLevel, setActiveLevel] = useState('basic');
  const [courses, setCourses] = useState(localStorage.getItem('courses') ? JSON.parse(localStorage.getItem('courses')) : null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update body color and save preference
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Function to extract playlist ID from URL
  const getPlaylistId = (url) => {
    const regex = /[?&]list=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Add useEffect to fetch courses
  useEffect(() => {

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://script.google.com/macros/s/AKfycbzCMYoqlVSXJomF0nsbfGz5Td12RBo7gvQz5na6bgA9P-3wyFv_VB2r9g7S_jhw3-Iy/exec');
        const data = await response.json();
        setCourses(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    localStorage.setItem('courses', JSON.stringify(courses));
    fetchCourses();
  }, []);

  // Add this helper function
  const getNextLevel = (current) => {
    const levels = Object.keys(courses);
    const currentIndex = levels.indexOf(current);
    return levels[currentIndex + 1] || current;
  };

  const getPrevLevel = (current) => {
    const levels = Object.keys(courses);
    const currentIndex = levels.indexOf(current);
    return levels[currentIndex - 1] || current;
  };

  return (
    <div className={`container my-4 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="position-fixed top-0 end-0 m-2 m-sm-3 z-3">
        <button 
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <div className="icon-container">
            <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </div>
        </button>
      </div>

      <header className="mb-5" style={{ 
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'  // darker gradient for dark mode
          : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)', // original gradient for light mode
        padding: '2rem',
        borderRadius: '10px',
        color: 'white',
        boxShadow: isDarkMode 
          ? '0 4px 20px rgba(0,0,0,0.3)'
          : '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div className="d-flex align-items-center mb-4">
          <span 
            className={`${isDarkMode ? 'bg-light' : 'bg-white'}`}
            style={{ width: "4px", height: "16px" }}
          ></span>
          <p 
            className={`ms-2 mb-0 text-uppercase ${isDarkMode ? 'text-light' : 'text-white'}`}
            style={{ letterSpacing: '1px', fontSize: '0.85rem' }}
          >
            Student Journey | Learn Islam
          </p>
        </div>
        <h1 className="fw-bold text-center fs-2 fs-md-1">
          'Aqeedah & The Foundations of The Religion
        </h1>
        <p className="fs-5 fw-bold text-center">
          العقيدة وأصول الدين
        </p>
        <hr 
          className="mx-auto" 
          style={{ 
            width: "200px", 
            height: "2px", 
            opacity: isDarkMode ? "0.3" : "0.5", 
            backgroundColor: "white" 
          }} 
        />
      </header>

      <div className="text-center mb-4 d-flex justify-content-center align-items-center gap-3">
        <button
          className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} px-3`}
          onClick={() => setActiveLevel(getPrevLevel(activeLevel))}
          disabled={activeLevel === 'basic'}
          style={{ opacity: activeLevel === 'advanced' ? 0.5 : 1 }}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        
        <button
          className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'} fw-bold px-4 px-md-5 text-uppercase`}
          style={{
            minWidth: '180px',
            transition: 'all 0.3s ease',
          }}
        >
          {activeLevel}
        </button>

        <button
          className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} px-3`}
          onClick={() => setActiveLevel(getNextLevel(activeLevel))}
          disabled={activeLevel === 'advanced'}
          style={{ opacity: activeLevel === 'advanced' ? 0.5 : 1 }}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="row justify-content-center g-4">
        {isLoading && courses === null ? (
          <>
            {[1, 2].map((skeleton) => (
              <div key={skeleton} className="col-12 mb-4">
                <div className="card h-100" style={{
                  background: isDarkMode ? '#1e1e1e' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  border: isDarkMode ? '1px solid #333' : '1px solid #dee2e6',
                  boxShadow: isDarkMode ? '0 2px 15px rgba(0,0,0,0.2)' : '0 2px 15px rgba(0,0,0,0.05)'
                }}>
                  <div className="card-body p-3 p-md-4">
                    <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                      <div 
                        className="skeleton-image rounded"
                        style={{ 
                          width: "100%",
                          maxWidth: "250px",
                          height: "150px",
                          backgroundColor: isDarkMode ? '#333' : '#e9ecef',
                          animation: 'pulse 1.5s infinite'
                        }}
                      ></div>
                      <div className="flex-grow-1 text-center text-md-start" style={{ width: '100%' }}>
                        <div className="d-flex flex-column flex-md-row align-items-center mb-2 gap-2">
                          <div 
                            className="skeleton-circle rounded-circle"
                            style={{ 
                              width: "35px",
                              height: "35px",
                              backgroundColor: isDarkMode ? '#333' : '#e9ecef',
                              animation: 'pulse 1.5s infinite'
                            }}
                          ></div>
                          <div style={{ width: '100%' }}>
                            <div 
                              className="skeleton-text mb-2"
                              style={{ 
                                height: "24px",
                                width: "70%",
                                backgroundColor: isDarkMode ? '#333' : '#e9ecef',
                                animation: 'pulse 1.5s infinite'
                              }}
                            ></div>
                            <div 
                              className="skeleton-text mb-2"
                              style={{ 
                                height: "20px",
                                width: "40%",
                                backgroundColor: isDarkMode ? '#333' : '#e9ecef',
                                animation: 'pulse 1.5s infinite'
                              }}
                            ></div>
                            <div 
                              className="skeleton-text"
                              style={{ 
                                height: "16px",
                                width: "90%",
                                backgroundColor: isDarkMode ? '#333' : '#e9ecef',
                                animation: 'pulse 1.5s infinite'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div 
                        className="skeleton-button"
                        style={{ 
                          width: "150px",
                          height: "48px",
                          borderRadius: "50px",
                          backgroundColor: isDarkMode ? '#333' : '#e9ecef',
                          animation: 'pulse 1.5s infinite'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          courses[activeLevel].length === 0 ? (
            <div className="col-12 text-center">
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
            </div>
          ) : (
            courses[activeLevel].map((course, index) => (
              <div key={course.id} className="col-12">
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
                      className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'} fw-bold px-4 py-3`}
                      style={{ 
                        borderRadius: '50px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                      onClick={() => setSelectedVideo(getPlaylistId(course.link))}
                    >
                      START LEARNING
                    </button>
                  </div>
                </div>
              </div>
              </div>
            ))
          )
        )}
      </div>

      <Modal
        open={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        center
        classNames={{
          modal: 'customModal',
          overlay: 'customOverlay',
        }}
        styles={{
          modal: {
            background: "#fff",
            maxWidth: '900px',
            width: '90%',
            padding: '0',
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <div className="ratio ratio-16x9">
          <iframe
            src={`https://www.youtube.com/embed/videoseries?list=${selectedVideo}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default App;