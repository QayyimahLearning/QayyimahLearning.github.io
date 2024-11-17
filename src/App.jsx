import React, { useState, useEffect } from "react";
import { Modal } from 'react-responsive-modal';
import { motion } from "framer-motion";

import logoDark from './assets/images/logo-dark.png';
import logoLight from './assets/images/logo-light.png';
import animationLogoDark from './assets/images/animation-logo-dark.png';
import animationLogoLight from './assets/images/animation-logo-light.png';

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
  const [courses, setCourses] = useState({
    basic: [],
    intermediate: [],
    advanced: []
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProgram, setActiveProgram] = useState('aqeeda');
  const [programs, setPrograms] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://script.google.com/macros/s/AKfycbyUSdC5_dCyhIia9bVuFkHWzpmRcwL7jjX5PK_m7m2pnuL_0JQgCVD67Sxbk8culKeZ/exec');
        const data = await response.json();
        setPrograms(data.programs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };
    fetchPrograms();
  }, []);

  // Add these helper functions for program navigation
  const getNextProgram = (current) => {
    const programIds = Object.keys(programs || {});
    const currentIndex = programIds.indexOf(current);
    return programIds[currentIndex + 1] || current;
  };

  const getPrevProgram = (current) => {
    const programIds = Object.keys(programs || {});
    const currentIndex = programIds.indexOf(current);
    return programIds[currentIndex - 1] || current;
  };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  // Add this useEffect for PWA install detection
  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Handle Android install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });

    // Show iOS prompt if not installed
    if (isIOSDevice && !window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(true);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (showSplash) {
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
  }

  return (
    <div className={`container my-4 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="install-prompt position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-3 rounded-4 d-flex align-items-center gap-3"
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
              Install Qayyima App
            </p>
            <p className="mb-0 small" style={{ color: isDarkMode ? '#ccc' : '#666' }}>
              {isIOS ? 
                'Tap the share button and select "Add to Home Screen"' :
                'Install our app for a better experience'
              }
            </p>
          </div>
          {!isIOS && (
            <button
              className="btn fw-bold px-3 py-2"
              onClick={handleInstallClick}
              style={{
                background: isDarkMode ? 'white' : '#2c3e50',
                color: isDarkMode ? '#2c3e50' : 'white',
                border: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Install
            </button>
          )}
          <button
            className="btn-close position-absolute top-0 end-0 mt-2 me-2"
            onClick={() => setShowInstallPrompt(false)}
            style={{
              opacity: 0.5,
              transform: 'scale(0.8)',
            }}
          />
        </motion.div>
      )}

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

      <div className="container my-4">
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

        <header className="mb-5" style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
          padding: '2rem',
          borderRadius: '10px',
          color: 'white',
          boxShadow: isDarkMode 
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div className="d-flex justify-content-between align-items-center">
            <button
              className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-white'} px-3 rounded-circle`}
              onClick={() => setActiveProgram(getPrevProgram(activeProgram))}
              disabled={activeProgram === Object.keys(programs || {})[0]}
              style={{ 
                opacity: activeProgram === Object.keys(programs || {})[0] ? 0.5 : 1,
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <div className="text-center flex-grow-1">
              {isLoading ? (
                <>
                  <div className="d-flex align-items-center justify-content-center mb-4">
                    <div 
                      className="skeleton-text"
                      style={{ 
                        height: "16px",
                        width: "200px",
                        backgroundColor: isDarkMode ? '#333' : 'rgba(255,255,255,0.2)',
                        animation: 'pulse 1.5s infinite',
                        borderRadius: '4px'
                      }}
                    ></div>
                  </div>
                  <div 
                    className="skeleton-text mb-3"
                    style={{ 
                      height: "40px",
                      width: "60%",
                      margin: "0 auto",
                      backgroundColor: isDarkMode ? '#333' : 'rgba(255,255,255,0.2)',
                      animation: 'pulse 1.5s infinite',
                      borderRadius: '4px'
                    }}
                  ></div>
                  <div 
                    className="skeleton-text"
                    style={{ 
                      height: "24px",
                      width: "80%",
                      margin: "0 auto",
                      backgroundColor: isDarkMode ? '#333' : 'rgba(255,255,255,0.2)',
                      animation: 'pulse 1.5s infinite',
                      borderRadius: '4px'
                    }}
                  ></div>
                </>
              ) : (
                <>
                  <h1 className="fw-bold text-center fs-2 fs-md-1">
                    {programs?.[activeProgram]?.pTitle}
                  </h1>
                  <p className="fs-5 text-center">
                    {programs?.[activeProgram]?.pDescription}
                  </p>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    {Object.keys(programs || {}).map((program) => (
                      <div
                        key={program}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: program === activeProgram ? 'white' : 'rgba(255,255,255,0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-white'} px-3 rounded-circle`}
              onClick={() => setActiveProgram(getNextProgram(activeProgram))}
              disabled={activeProgram === Object.keys(programs || {}).pop()}
              style={{ 
                opacity: activeProgram === Object.keys(programs || {}).pop() ? 0.5 : 1,
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'
              }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
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
            className={`btn fw-bold px-4 px-md-5 text-uppercase`}
            style={{
              minWidth: '180px',
              transition: 'all 0.3s ease',
              background: isDarkMode 
                ? 'white'
                : 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
              border: 'none',
              color: isDarkMode ? '#1e1e1e' : 'white',
              boxShadow: isDarkMode 
                ? '0 4px 15px rgba(0,0,0,0.3)'
                : '0 4px 15px rgba(0,0,0,0.1)'
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
          {isLoading ? (
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
            programs?.[activeProgram]?.courses.filter(course => course.level === activeLevel).length === 0 ? (
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
              programs?.[activeProgram]?.courses.map((course, index) => (
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
    </div>
  );
};

export default App;