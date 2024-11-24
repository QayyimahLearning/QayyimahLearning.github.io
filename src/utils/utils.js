// Program Navigation
export const getNextProgram = (current, programs) => {
  const programIds = Object.keys(programs || {});
  const currentIndex = programIds.indexOf(current);
  return programIds[currentIndex + 1] || current;
};

export const getPrevProgram = (current, programs) => {
  const programIds = Object.keys(programs || {});
  const currentIndex = programIds.indexOf(current);
  return programIds[currentIndex - 1] || current;
};

// YouTube Playlist ID Extraction
export const getPlaylistId = (url) => {
  const regex = /[?&]list=([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Theme Management
export const getInitialTheme = () => {
  const savedMode = localStorage.getItem('darkMode');
  return savedMode ? JSON.parse(savedMode) : false;
};

export const saveThemePreference = (isDarkMode) => {
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
};

// Device Detection
export const isIOSDevice = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}; 