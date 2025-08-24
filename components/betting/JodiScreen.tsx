"use client";

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WalletChip from '@/components/ui/WalletChip';

interface JodiScreenProps {
  onBack: () => void;
  gameName: string;
}

interface BetData {
  [key: string]: number;
}

const JodiScreen: React.FC<JodiScreenProps> = ({ onBack, gameName }) => {
  const { user } = useAuth();
  const [betData, setBetData] = useState<BetData>({});
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (jodi: string, amount: string) => {
    const numAmount = parseInt(amount);
    if (!amount || numAmount < 10) {
      const newBetData = { ...betData };
      delete newBetData[jodi];
      setBetData(newBetData);
    } else {
      setBetData({
        ...betData,
        [jodi]: numAmount
      });
    }
  };

  const handleSubmit = async () => {
    const bets = Object.entries(betData);
    if (bets.length === 0) {
      alert('Please place at least one bet');
      return;
    }

    const totalAmount = Object.values(betData).reduce((sum, amount) => sum + amount, 0);
    if (!user?.balance || user.balance < totalAmount) {
      alert('Insufficient balance');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Bets placed successfully! Total: ₹${totalAmount}`);
      onBack();
    } catch (error) {
      alert('Failed to place bets');
    } finally {
      setLoading(false);
    }
  };

  const totalBets = Object.keys(betData).length;
  const totalAmount = Object.values(betData).reduce((sum, amount) => sum + amount, 0);

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
            <h1 className="text-lg font-bold text-gray-800">{gameName} (JODI)</h1>
          </div>
          <WalletChip size="sm" />
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Jodi</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-orange-500">📅</span>
              <span className="text-sm font-medium">24 Aug 2025</span>
            </div>
            <div className="bg-gray-100 rounded-lg px-3 py-1">
              <span className="text-sm font-medium text-orange-600">OPEN</span>
              <span className="ml-2 text-orange-500">🔽</span>
            </div>
          </div>
        </div>
      </div>

      {/* Jodi Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {Array.from({ length: 100 }, (_, i) => {
            const jodi = i.toString().padStart(2, '0');
            return (
              <div key={jodi} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-orange-400 text-white text-center py-3 font-bold text-xl">
                  {jodi}
                </div>
                <div className="p-3">
                  <input
                    type="number"
                    placeholder="₹"
                    min="10"
                    value={betData[jodi] || ''}
                    onChange={(e) => handleAmountChange(jodi, e.target.value)}
                    className="w-full px-2 py-2 border border-gray-300 rounded text-center font-medium"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      {totalBets > 0 && (
        <div className="p-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span>Total Bids: {totalBets}</span>
              <span className="font-bold">Total Amount: ₹{totalAmount}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Potential Win: ₹{totalAmount * 95}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'SUBMIT'}
          </button>
        </div>
      )}

      {/* Balance Info */}
      <div className="text-center text-sm text-gray-600 p-4">
        Available Balance: ₹{user?.balance || 0}
      </div>
    </div>
  );
};

export default JodiScreen;
