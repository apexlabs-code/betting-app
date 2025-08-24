"use client";

import { useEffect, useState } from "react";
import { generateToken, messaging } from "@/notification/firebase";
import { onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import PWA from "./PWA";
import LandingPage from "../components/landingPage";

export default function Page() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Generate FCM token
    generateToken();

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging(), (payload) => {
      console.log("Message received: ", payload);
      if (payload?.notification?.body) {
        toast(payload.notification.body);
      }
    });

    // Detect standalone mode (PWA)
    if (typeof window !== "undefined") {
      const standalone =
        // @ts-ignore
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(standalone);
    }

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      {isStandalone ? (
        // If running as PWA
        <AuthProvider>
          <PWA />
        </AuthProvider>
      ) : (
        // If running in browser
        <LandingPage />
      )}
    </>
  );
}