"use client";

import React, { useState } from 'react';
import { 
  ClipboardList, 
  TrendingUp, 
  Home, 
  Wallet, 
  MessageCircle 
} from 'lucide-react';

interface BottomTabsProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ onTabChange, activeTab: propActiveTab }) => {
  const [localActiveTab, setLocalActiveTab] = useState('Home');
  const [message, setMessage] = useState('Welcome to Home');

  const activeTab = propActiveTab || localActiveTab;

  const tabs = [
    { 
      icon: ClipboardList, 
      label: 'Bids', 
      id: 'Bids',
      message: 'Switched to Bids - View your betting history here!'
    },
    { 
      icon: TrendingUp, 
      label: 'Game Rate', 
      id: 'GameRate',
      message: 'Switched to Game Rate - Check current game rates!'
    },
    { 
      icon: Home, 
      label: 'Home', 
      id: 'Home',
      message: 'Welcome to Home - Your dashboard!'
    },
    { 
      icon: Wallet, 
      label: 'Funds', 
      id: 'Funds',
      message: 'Switched to Funds - Manage your wallet!'
    },
    { 
      icon: MessageCircle, 
      label: 'Support', 
      id: 'Support',
      message: 'Switched to Support - Get help here!'
    },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    setLocalActiveTab(tab.id);
    setMessage(tab.message);
    console.log(`Tab switched to: ${tab.label}`);
    
    if (onTabChange) {
      onTabChange(tab.id);
    }
  };

  return (
    <>
      {/* Demo Message Display - Only show if no external handler */}
      {!onTabChange && message && (
        <div className="fixed top-20 left-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg z-30 md:hidden">
          <p className="text-sm text-center">{message}</p>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab, index) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={index}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col items-center justify-center py-2 px-3 min-h-[60px] transition-colors duration-200 ${
                  isActive 
                    ? 'text-orange-500' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <IconComponent 
                  className={`w-6 h-6 mb-1 ${
                    isActive ? 'text-orange-500' : 'text-gray-600'
                  }`} 
                />
                <span 
                  className={`text-xs font-medium ${
                    isActive ? 'text-orange-500' : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomTabs;
