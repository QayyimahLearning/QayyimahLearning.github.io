import { useState, useEffect } from 'react';
import { fetchPrograms } from '../services/api';

export const usePrograms = () => {
  const [programs, setPrograms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPrograms = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPrograms();
      setPrograms(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPrograms();
    
    // Add event listener for language changes
    window.addEventListener('languageChange', getPrograms);
    
    // Cleanup
    return () => {
      window.removeEventListener('languageChange', getPrograms);
    };
  }, []);

  return { programs, isLoading, error };
}; 