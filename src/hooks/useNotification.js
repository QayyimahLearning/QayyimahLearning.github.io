import { useState, useEffect } from 'react';
import { useAnalytics } from './useAnalytics';
import { requestNotificationPermission, onMessageListener } from '../config/notification';

export const useNotification = () => {
  const [notification, setNotification] = useState(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const setupNotification = async () => {
      try {
        const token = await requestNotificationPermission();
        if (token) {
          setIsPermissionGranted(true);
          trackEvent('notification_permission_granted', {
            token: token.slice(0, 10) // Only track part of token for privacy
          });
        }
      } catch (error) {
        trackEvent('notification_permission_denied', {
          error: error.message
        });
      }
    };

    setupNotification();
  }, [trackEvent]);

  useEffect(() => {
    const unsubscribe = onMessageListener()
      .then(payload => {
        setNotification(payload);
        trackEvent('notification_received', {
          title: payload?.notification?.title
        });
      })
      .catch(err => {
        console.error('Failed to receive notification:', err);
      });

    return () => unsubscribe;
  }, [trackEvent]);

  return { notification, isPermissionGranted };
}; 