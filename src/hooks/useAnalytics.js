import { useEffect, useCallback } from 'react';
import { analytics } from '../config/firebase';
import { logEvent } from 'firebase/analytics';

export const useAnalytics = () => {
  // Track page views automatically
  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_path: window.location.pathname,
      page_title: document.title
    });
  }, []);

  // Utility function to track custom events
  const trackEvent = useCallback((eventName, eventParams = {}) => {
    logEvent(analytics, eventName, eventParams);
  }, []);

  return { trackEvent };
}; 