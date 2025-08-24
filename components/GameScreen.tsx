"use client";

import React, { useState } from 'react';
import { ArrowLeft, Wallet, Square, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Car, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WalletChip from '@/components/ui/WalletChip';
import BetPlacement from './BetPlacement';
import SingleAnkScreen from './betting/SingleAnkScreen';
import SingleAnkBulkScreen from './betting/SingleAnkBulkScreen';
import JodiScreen from './betting/JodiScreen';
import JodiBulkScreen from './betting/JodiBulkScreen';

interface GameScreenProps {
  onBack: () => void;
  gameName: string;
  gameNumber: string;
  openTime: string;
  closeTime: string;
}

interface BetOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  rate: string;
}

const GameScreen: React.FC<GameScreenProps> = ({ 
  onBack, 
  gameName, 
  gameNumber, 
  openTime, 
  closeTime 
}) => {
  const { user } = useAuth();
  const [selectedBet, setSelectedBet] = useState<BetOption | null>(null);

  const betOptions: BetOption[] = [
    {
      id: 'single-ank',
      name: 'Single Ank',
      icon: <Square className="w-8 h-8" />,
      rate: '1:9.5'
    },
    {
      id: 'single-ank-bulk',
      name: 'Single Ank Bulk',
      icon: (
        <div className="flex">
          <Square className="w-6 h-6" />
          <Square className="w-6 h-6 -ml-2" />
        </div>
      ),
      rate: '1:9.5'
    },
    {
      id: 'jodi',
      name: 'Jodi',
      icon: <Dice2 className="w-8 h-8" />,
      rate: '1:95'
    },
    {
      id: 'jodi-bulk',
      name: 'Jodi Bulk',
      icon: (
        <div className="flex">
          <Dice2 className="w-6 h-6" />
          <Dice2 className="w-6 h-6 -ml-2" />
        </div>
      ),
      rate: '1:95'
    },
    {
      id: 'single-pana',
      name: 'Single Pana',
      icon: <Dice3 className="w-8 h-8" />,
      rate: '1:150'
    },
    {
      id: 'single-pana-bulk',
      name: 'Single Pana Bulk',
      icon: (
        <div className="flex">
          <Dice3 className="w-6 h-6" />
          <Dice3 className="w-6 h-6 -ml-2" />
        </div>
      ),
      rate: '1:150'
    },
    {
      id: 'double-pana',
      name: 'Double Pana',
      icon: <Dice4 className="w-8 h-8" />,
      rate: '1:300'
    },
    {
      id: 'double-pana-bulk',
      name: 'Double Pana Bulk',
      icon: (
        <div className="flex">
          <Dice4 className="w-6 h-6" />
          <Dice4 className="w-6 h-6 -ml-2" />
        </div>
      ),
      rate: '1:300'
    },
    {
      id: 'triple-pana',
      name: 'Triple Pana',
      icon: <Dice5 className="w-8 h-8" />,
      rate: '1:700'
    },
    {
      id: 'pana-family',
      name: 'Pana Family',
      icon: <Dice6 className="w-8 h-8" />,
      rate: '1:150'
    },
    {
      id: 'sp-motor',
      name: 'SP MOTOR',
      icon: <Car className="w-8 h-8" />,
      rate: '1:150'
    },
    {
      id: 'dp-motor',
      name: 'DP MOTOR',
      icon: <Target className="w-8 h-8" />,
      rate: '1:300'
    }
  ];

  const handleBetSelect = (betId: string) => {
    const bet = betOptions.find(option => option.id === betId);
    if (bet) {
      setSelectedBet(bet);
    }
  };

  const handleBackToBets = () => {
    setSelectedBet(null);
  };

  // Show appropriate betting screen based on selected bet type
  if (selectedBet) {
    switch (selectedBet.id) {
      case 'single-ank':
        return <SingleAnkScreen onBack={handleBackToBets} gameName={gameName} />;
      case 'single-ank-bulk':
        return <SingleAnkBulkScreen onBack={handleBackToBets} gameName={gameName} />;
      case 'jodi':
        return <JodiScreen onBack={handleBackToBets} gameName={gameName} />;
      case 'jodi-bulk':
        return <JodiBulkScreen onBack={handleBackToBets} gameName={gameName} />;
      default:
        return (
          <BetPlacement
            onBack={handleBackToBets}
            betType={selectedBet.id}
            betName={selectedBet.name}
            rate={selectedBet.rate}
            gameName={gameName}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-gray-800">{gameName}</h1>
          </div>
          <WalletChip size="sm" />
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500 mb-2">{gameNumber}</div>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <div>
              <span className="font-medium">Open: </span>
              <span>{openTime}</span>
            </div>
            <div>
              <span className="font-medium">Close: </span>
              <span>{closeTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Info */}
      <div className="bg-blue-50 border-b border-blue-200 p-3">
        <p className="text-blue-600 text-sm text-center">
          Available Balance: <strong>₹{user?.balance || 0}</strong>
        </p>
      </div>

      {/* Betting Options Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {betOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleBetSelect(option.id)}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md active:scale-95 transform transition-all"
            >
              <div className="text-center">
                <div className="flex justify-center mb-3 text-orange-500">
                  {option.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {option.name}
                </h3>
                <p className="text-xs text-gray-500">Rate: {option.rate}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Notice */}
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-xs text-center">
            ⚠️ Gambling can be addictive. Please play responsibly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
