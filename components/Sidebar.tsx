"use client";

import React from 'react';
import { 
  Home, 
  ClipboardList, 
  Wallet, 
  CreditCard, 
  BarChart3, 
  TrendingUp, 
  UserPlus, 
  Youtube, 
  Settings, 
  Lock, 
  Share2, 
  LogOut,
  X,
  User
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (screen: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const sidebarItems = [
    { icon: Home, label: 'Home', href: '/home' },
    { icon: ClipboardList, label: 'My Bids', href: '/my-bids' },
    { icon: Wallet, label: 'Funds', href: '/funds' },
    { icon: CreditCard, label: 'Bank Details', href: '/bank-details' },
    { icon: BarChart3, label: 'Charts', href: '/charts' },
    { icon: TrendingUp, label: 'Game Rate', href: '/game-rate' },
    { icon: UserPlus, label: 'Refer and Earn', href: '/refer' },
    { icon: Youtube, label: 'Youtube', href: '/youtube' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: Lock, label: 'Change Password', href: '/change-password' },
    { icon: Share2, label: 'Share App', href: '/share' },
    { icon: LogOut, label: 'Logout', href: '/logout' },
  ];

  const handleItemClick = (label: string, href: string) => {
    console.log(`Navigating to ${label}: ${href}`);
    
    // Handle special navigation cases
    if (label === 'Game Rate' && onNavigate) {
      onNavigate('GameRate');
    } else if (label === 'Home' && onNavigate) {
      onNavigate('Home');
    } else if (label === 'My Bids' && onNavigate) {
      onNavigate('Bids');
    } else if (label === 'Funds' && onNavigate) {
      onNavigate('Funds');
    }
    
    // Add your navigation logic here for other items
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 w-80 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">rishab</h3>
              <p className="text-sm text-gray-600">8817775239</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-4">
            {sidebarItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item.label, item.href)}
                  className="w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* App Version */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">App Version: 3.0.0</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
