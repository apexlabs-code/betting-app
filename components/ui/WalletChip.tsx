"use client";

import React from 'react';
import { Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface WalletChipProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const WalletChip: React.FC<WalletChipProps> = ({ 
  size = 'md', 
  showIcon = true, 
  className = '' 
}) => {
  const { user } = useAuth();

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs py-1 px-2 gap-x-1';
      case 'lg':
        return 'text-base py-2 px-3 gap-x-3';
      default:
        return 'text-sm py-1 px-2 gap-x-2';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-5 h-5';
      default:
        return 'w-4 h-4';
    }
  };

  return (
    <div className={`bg-gray-200 rounded-full flex items-center justify-center ${getSizeClasses()} ${className}`}>
      {showIcon && <Wallet className={getIconSize()} />}
      <span className="font-bold">₹{user?.balance?.toFixed(2) || '0.00'}</span>
    </div>
  );
};

export default WalletChip;
