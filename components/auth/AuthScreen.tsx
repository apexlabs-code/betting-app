"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';
import Register from './Register';
import Image from 'next/image';

const AuthScreen: React.FC = () => {
  const [authMode, setAuthMode] = useState<'initial' | 'login' | 'register'>('initial');
  const [mobile, setMobile] = useState('');
  const [isCheckingUser, setIsCheckingUser] = useState(false);

  const { checkUserExists } = useAuth();
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'DPBOSS';

  const handleMobileSubmit = async (mobileNumber: string) => {
    if (!/^\d{10}$/.test(mobileNumber)) {
      return;
    }

    setIsCheckingUser(true);
    setMobile(mobileNumber);

    try {
      const result = await checkUserExists(mobileNumber);
      
      if (result.exists) {
        setAuthMode('login');
      } else {
        setAuthMode('register');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      // Default to register if there's an error
      setAuthMode('register');
    } finally {
      setIsCheckingUser(false);
    }
  };

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  const handleBack = () => {
    setAuthMode('initial');
    setMobile('');
  };

  // Initial mobile entry screen
  if (authMode === 'initial') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-8 bg-orange-500 rounded"></div>
              <h1 className="text-xl font-bold text-gray-800">WELCOME TO {appName}</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center p-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg border-4 border-orange-200">
              <Image 
                src="/logo.png" 
                alt={appName} 
                width={80} 
                height={80}
                className="rounded-full object-cover"
                onError={(e) => {
                  // Fallback to a clean icon if image fails to load
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="text-orange-500 font-bold text-2xl hidden items-center justify-center w-full h-full">
                {appName.charAt(0)}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{appName}</h2>
          </div>

          {/* Mobile Entry Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const mobileNumber = formData.get('mobile') as string;
              handleMobileSubmit(mobileNumber);
            }}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-4 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                required
                maxLength={10}
              />
            </div>

            <button
              type="submit"
              disabled={isCheckingUser}
              className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingUser ? 'CHECKING...' : 'CONTINUE'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Login screen
  if (authMode === 'login') {
    return (
      <Login 
        onSwitchToRegister={handleSwitchToRegister}
        prefilledMobile={mobile}
      />
    );
  }

  // Register screen
  return (
    <Register 
      onSwitchToLogin={handleSwitchToLogin}
    />
  );
};

export default AuthScreen;
