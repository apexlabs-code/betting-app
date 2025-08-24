"use client";

import React, { useState } from 'react';
import { Menu, Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import BottomTabs from './BottomTabs';
import GameRates from './GameRates';
import MyBids from './MyBids';
import Funds from './wallet/Funds';
import Image from 'next/image';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Home');
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setCurrentScreen(tab);
  };

  const handleBackToHome = () => {
    setCurrentScreen('Home');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'GameRate':
        return <GameRates onBack={handleBackToHome} />;
      case 'Bids':
        return <MyBids onBack={handleBackToHome} />;
      case 'Funds':
        return <Funds onBack={handleBackToHome} />;
      case 'Support':
        return (
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">Support</h2>
            <p className="text-gray-600 mt-2">Get help and contact support</p>
          </div>
        );
      default:
        return children;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render current screen */}
      {currentScreen === 'GameRate' || currentScreen === 'Bids' || currentScreen === 'Funds' ? (
        renderCurrentScreen()
      ) : (
        <>
          {/* Header - Only visible on mobile and for non-GameRate screens */}
          <header className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-30 md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex gap-x-2 items-center">
                <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <Image
              alt='logo'
              src='/logo.png'
              width={40}
              height={40}
              className="rounded-full"
              />
              </div>
              
              <div className="flex text-sm text-gray-600 items-center space-x-2">
                <Wallet />
                <span className="">₹ {user?.balance || '0.0'}</span>
              </div>
            </div>
          </header>

          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} onNavigate={handleTabChange} />

          {/* Main Content */}
          <main className="pb-20 md:pb-0">
            {renderCurrentScreen()}
          </main>
        </>
      )}

      {/* Bottom Navigation - Always visible */}
      <BottomTabs onTabChange={handleTabChange} activeTab={currentScreen} />
    </div>
  );
};

export default MobileLayout;
