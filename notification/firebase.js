// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNqYYwXEVlRD-WMRCTByjofwDlIMJ5fhQ",
  authDomain: "fcm-test-91d44.firebaseapp.com",
  projectId: "fcm-test-91d44",
  storageBucket: "fcm-test-91d44.firebasestorage.app",
  messagingSenderId: "34760786697",
  appId: "1:34760786697:web:55c29af8320fcd734509d8",
  measurementId: "G-VZN8XJ5HDR",
};
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    export const messaging =  () => {return getMessaging(app)};
    console.log("Firebase initialized with messaging service:", messaging);
    

export const generateToken = async () => {
  const messaging = getMessaging(app);
  const permission = await Notification.requestPermission();
  console.log("Notification permission:", permission);
  if (permission === "granted") {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BFrOzGnFDD6kELpDFUdnMjhMA6FZO2LNhWGCIyFBwc7NpA9X66Nhw5Yk6TNa1B-fnUe5SVWifBQBNV3RgTDA510",
      });
      console.log("FCM Token:", token);
      return token;
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  } else {
    console.warn("Notification permission not granted");
  }
};
