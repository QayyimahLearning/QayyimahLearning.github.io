const API_URL = 'https://script.google.com/macros/s/AKfycbzNHxuW2zLr8ZxQvLytI2m2nVd6h251IqCAR-5THv41sdMmZv4pF7tNxYYXTRb-TDXy/exec';

export const LANGUAGE_CHANGE_EVENT = 'languageChange';

export const fetchPrograms = async () => {
  try {
    if (!navigator.onLine) {
      throw new Error('No internet connection');
    }

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Get language from sessionStorage or default to 'ml'
    const selectedLanguage = sessionStorage.getItem('language') || 'ml';
    
    // Return programs for the selected language
    return data.languages[selectedLanguage] || {};
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
}; 