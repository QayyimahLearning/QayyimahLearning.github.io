const API_URL = 'https://script.google.com/macros/s/AKfycbyUSdC5_dCyhIia9bVuFkHWzpmRcwL7jjX5PK_m7m2pnuL_0JQgCVD67Sxbk8culKeZ/exec';

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
    return data.programs;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
}; 