/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDsNtWhBpB9YjNzW4fmBjSh2VwjEX13xTk',
  authDomain: 'armybots-18db9.firebaseapp.com',
  projectId: 'armybots-18db9',
  storageBucket: 'armybots-18db9.appspot.com',
  messagingSenderId: '441414543651',
  appId: '1:441414543651:web:6e435555614de085714496',
  measurementId: 'G-EQK1DQHKHM',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon || payload.data.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
