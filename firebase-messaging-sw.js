importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Service workers can't access environment variables, so we need to hardcode the config
const firebaseConfig = {
  apiKey: "AIzaSyATokp3Q0z-Z_4Pa90BX08bfbS2vakSSks",
  authDomain: "qayyimahlearning.firebaseapp.com",
  projectId: "qayyimahlearning",
  storageBucket: "qayyimahlearning.firebasestorage.app",
  messagingSenderId: "706212511881",
  appId: "1:706212511881:web:043a4c9db1371571b60658"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './android-chrome-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}); 