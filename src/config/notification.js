import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore, doc, setDoc, getDoc, getDocs, query, where, collection, writeBatch } from 'firebase/firestore';
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

    // Wait for service worker registration
    const registration = await navigator.serviceWorker.ready;
    if (!registration) {
      throw new Error('No service worker registration found');
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      try {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration
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
    const tokenRef = doc(db, 'notification_tokens', token);
    
    // Get the existing token document
    const tokenDoc = await getDoc(tokenRef);
    
    const tokenData = {
      token,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      lastActive: new Date(),
    };

    if (!tokenDoc.exists()) {
      // New token - add creation date
      tokenData.createdAt = new Date();
    }

    // Update or create the token document
    await setDoc(tokenRef, tokenData, { merge: true });
    
    // Optionally, clean up old tokens
    await cleanupOldTokens();
    
  } catch (error) {
    console.error('Error saving token to Firestore:', error);
    throw error;
  }
};

// Optional: Clean up tokens older than X days
const cleanupOldTokens = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const q = query(
      collection(db, 'notification_tokens'),
      where('lastActive', '<', thirtyDaysAgo)
    );

    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    if (!snapshot.empty) {
      await batch.commit();
    }
  } catch (error) {
    console.error('Error cleaning up old tokens:', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  }); 