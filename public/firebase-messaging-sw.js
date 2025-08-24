// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBNqYYwXEVlRD-WMRCTByjofwDlIMJ5fhQ",
  authDomain: "fcm-test-91d44.firebaseapp.com",
  projectId: "fcm-test-91d44",
  storageBucket: "fcm-test-91d44.firebasestorage.app",
  messagingSenderId: "34760786697",
  appId: "1:34760786697:web:55c29af8320fcd734509d8",
  measurementId: "G-VZN8XJ5HDR",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon || '/icon.png',
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
