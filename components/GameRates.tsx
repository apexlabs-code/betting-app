"use client";

import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

interface GameRatesProps {
  onBack?: () => void;
}

const GameRates: React.FC<GameRatesProps> = ({ onBack }) => {
  const gameRates = [
    { name: 'Single', rate: '10 - 95' },
    { name: 'Jodi', rate: '10 - 950' },
    { name: 'Single Pana', rate: '10 - 1500' },
    { name: 'Double Pana', rate: '10 - 3000' },
    { name: 'Triple Pana', rate: '10 - 9000' },
    { name: 'Half Sangam', rate: '10 - 12000' },
    { name: 'Full Sangam', rate: '10 - 100000' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">GAME RATES</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Menu className="w-6 h-6 text-gray-700" />
            <span className="text-sm text-gray-600">5</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Game Win Rates for All Bids
          </h2>
        </div>

        {/* Game Rates List */}
        <div className="space-y-3">
          {gameRates.map((game, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <span className="text-gray-700 font-medium text-lg">
                {game.name}
              </span>
              <span className="text-orange-500 font-bold text-lg">
                {game.rate}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Rate Information:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Minimum bet amount is ₹10 for all games</li>
            <li>• Rates shown are winning multipliers</li>
            <li>• Full Sangam offers the highest payout</li>
            <li>• Contact support for detailed game rules</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameRates;
