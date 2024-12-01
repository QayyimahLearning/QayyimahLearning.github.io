import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from './firebase';

const messaging = getMessaging(app);
const db = getFirestore(app);

// First, check if the browser supports notifications
const checkNotificationSupport = () => {
  if (!('Notification' in window)) {
    throw new Error('This browser does not support notifications');
  }
};

export const requestNotificationPermission = async () => {
  try {
    // Check support first
    checkNotificationSupport();

    // Check current permission status
    if (Notification.permission === 'denied') {
      throw new Error('Notification permission was denied');
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      try {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
        });
        
        if (token) {
          await saveTokenToFirestore(token);
          return token;
        } else {
          throw new Error('No registration token available');
        }
      } catch (err) {
        console.error('Error getting token:', err);
        throw err;
      }
    }
    throw new Error('Notification permission denied');
  } catch (error) {
    console.error('Notification permission error:', error);
    throw error;
  }
};

const saveTokenToFirestore = async (token) => {
  try {
    await setDoc(
      doc(db, 'notification_tokens', token),
      {
        token,
        createdAt: new Date(),
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        lastActive: new Date()
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error saving token to Firestore:', error);
    throw error;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  }); 