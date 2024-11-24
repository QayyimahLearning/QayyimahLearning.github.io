import React, { useState, useEffect } from "react";
import { useTheme } from './contexts/ThemeContext';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import Offline from './components/Offline';

import logoDark from './assets/images/logo-dark.png';
import logoLight from './assets/images/logo-light.png';
import animationLogoDark from './assets/images/animation-logo-dark.png';
import animationLogoLight from './assets/images/animation-logo-light.png';

import Layout from './components/Layout/Layout';
import CourseCard from './components/CourseCard';
import ComingSoonCard from './components/ComingSoonCard';
import ProgramHeader from './components/ProgramHeader';
import LevelSelector from './components/LevelSelector';
import { CourseCardSkeleton } from './components/LoadingSkeleton';
import SplashScreen from './components/SplashScreen';
import VideoPlayer from './components/VideoPlayer';
import { usePrograms } from './hooks/usePrograms';

import {
  getNextProgram,
  getPrevProgram,
  getPlaylistId,
  saveThemePreference,
  isIOSDevice
} from './utils/utils';

const App = () => {
  const { isDarkMode } = useTheme();
  const isOnline = useOnlineStatus();
  const [activeLevel, setActiveLevel] = useState('basic');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeProgram, setActiveProgram] = useState('aqeeda');
  const [showSplash, setShowSplash] = useState(true);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Use the custom hook for fetching programs
  const { programs, isLoading, error } = usePrograms();

  // Get filtered courses based on active program and level
  const getFilteredCourses = () => {
    if (!programs || !programs[activeProgram]) return [];
    return programs[activeProgram].courses.filter(
      course => course.level === activeLevel
    );
  };

  // Theme effect
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
    saveThemePreference(isDarkMode);
  }, [isDarkMode]);

  // Splash screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // PWA install detection effect
  useEffect(() => {
    setIsIOS(isIOSDevice());

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });

    if (isIOSDevice() && !window.matchMedia('(display-mode: standalone)').matches) {
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

  // Show offline state before splash screen
  if (!isOnline || error) {
    return <Offline isDarkMode={isDarkMode} />;
  }

  if (showSplash) {
    return (
      <SplashScreen 
        isDarkMode={isDarkMode}
        animationLogoDark={animationLogoDark}
        animationLogoLight={animationLogoLight}
      />
    );
  }

  return (
    <Layout
      showInstallPrompt={showInstallPrompt}
      isIOS={isIOS}
      handleInstallClick={handleInstallClick}
      setShowInstallPrompt={setShowInstallPrompt}
      logoLight={logoLight}
      logoDark={logoDark}
    >
      <ProgramHeader 
        isDarkMode={isDarkMode}
        isLoading={isLoading}
        activeProgram={activeProgram}
        programs={programs}
        setActiveProgram={setActiveProgram}
        getPrevProgram={() => setActiveProgram(getPrevProgram(activeProgram, programs))}
        getNextProgram={() => setActiveProgram(getNextProgram(activeProgram, programs))}
      />

      <LevelSelector 
        isDarkMode={isDarkMode}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
      />

      <div className="row justify-content-center g-4">
        {isLoading ? (
          <>
            {[1, 2].map((skeleton) => (
              <div key={skeleton} className="col-12 mb-4">
                <CourseCardSkeleton isDarkMode={isDarkMode} />
              </div>
            ))}
          </>
        ) : (
          getFilteredCourses().length === 0 ? (
            <div className="col-12 text-center">
              <ComingSoonCard isDarkMode={isDarkMode} />
            </div>
          ) : (
            getFilteredCourses().map((course, index) => (
              <div key={course.id} className="col-12">
                <CourseCard 
                  course={course}
                  index={index}
                  isDarkMode={isDarkMode}
                  onVideoSelect={(link) => setSelectedVideo(getPlaylistId(link))}
                />
              </div>
            ))
          )
        )}
      </div>

      <VideoPlayer 
        playlistId={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </Layout>
  );
};

export default App;