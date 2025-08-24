"use client";

import React from 'react';
import { ArrowLeft, Plus, Minus, Building, Clock, RotateCcw } from 'lucide-react';
import WalletChip from '@/components/ui/WalletChip';

interface ManageFundsProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const ManageFunds: React.FC<ManageFundsProps> = ({ onBack, onNavigate }) => {
  const fundOptions = [
    {
      icon: Plus,
      title: 'ADD FUND',
      description: 'You can add funds to your wallet',
      color: 'bg-orange-500',
      action: 'DepositFunds'
    },
    {
      icon: Minus,
      title: 'WITHDRAW FUND',
      description: 'You can withdraw your winnings',
      color: 'bg-blue-500',
      action: 'WithdrawFund'
    },
    {
      icon: Building,
      title: 'BANK DETAILS',
      description: 'Add Bank Details for withdrawal',
      color: 'bg-gray-500',
      action: 'BankDetails'
    },
    {
      icon: Clock,
      title: 'ADD FUND HISTORY',
      description: 'Check your add fund history',
      color: 'bg-green-500',
      action: 'DepositHistory'
    },
    {
      icon: RotateCcw,
      title: 'WITHDRAW FUND HISTORY',
      description: 'Check your withdrawal fund history',
      color: 'bg-purple-500',
      action: 'WithdrawHistory'
    }
  ];

  const handleOptionClick = (action: string) => {
    onNavigate(action);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">MANAGE FUNDS</h1>
          <WalletChip size="md" />
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {fundOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option.action)}
                className="w-full bg-white rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow"
              >
                {/* Icon with colored background */}
                <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-800 text-lg">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>

                {/* Orange side border indicator */}
                <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageFunds;
