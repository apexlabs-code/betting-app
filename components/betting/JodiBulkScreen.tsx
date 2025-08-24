"use client";

import React, { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WalletChip from '@/components/ui/WalletChip';

interface JodiBulkScreenProps {
  onBack: () => void;
  gameName: string;
}

interface BetEntry {
  id: string;
  number: string;
  amount: number;
  type: 'OPEN' | 'CLOSE';
}

const JodiBulkScreen: React.FC<JodiBulkScreenProps> = ({ onBack, gameName }) => {
  const { user } = useAuth();
  const [betEntries, setBetEntries] = useState<BetEntry[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>('');
  const [currentAmount, setCurrentAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const addBetEntry = () => {
    if (!currentNumber || !currentAmount) {
      alert('Please enter both jodi and amount');
      return;
    }

    if (parseInt(currentAmount) < 10) {
      alert('Minimum bet amount is ₹10');
      return;
    }

    if (!/^[0-9]{2}$/.test(currentNumber)) {
      alert('Please enter a valid 2-digit jodi (00-99)');
      return;
    }

    const newEntry: BetEntry = {
      id: Date.now().toString(),
      number: currentNumber,
      amount: parseInt(currentAmount),
      type: 'OPEN'
    };

    setBetEntries([...betEntries, newEntry]);
    setCurrentNumber('');
    setCurrentAmount('');
  };

  const removeBetEntry = (id: string) => {
    setBetEntries(betEntries.filter(entry => entry.id !== id));
  };

  const handleSubmit = async () => {
    if (betEntries.length === 0) {
      alert('Please add at least one bet');
      return;
    }

    const totalAmount = betEntries.reduce((sum, entry) => sum + entry.amount, 0);
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

  const totalAmount = betEntries.reduce((sum, entry) => sum + entry.amount, 0);

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
            <h1 className="text-lg font-bold text-gray-800">RADHA NIGHT</h1>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">5</span>
          </div>
          <WalletChip size="sm" />
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Jodi Bulk</h2>
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

      {/* Add Entry Form */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              placeholder="Jodi"
              value={currentNumber}
              onChange={(e) => setCurrentNumber(e.target.value)}
              className="px-3 py-3 border border-gray-300 rounded-md text-center font-medium"
              maxLength={2}
            />
            <input
              type="number"
              placeholder="Amount"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              min="10"
              className="px-3 py-3 border border-gray-300 rounded-md text-center font-medium"
            />
            <button
              onClick={addBetEntry}
              className="bg-orange-500 text-white rounded-md font-bold hover:bg-orange-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Bet Entries Table */}
        {betEntries.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
            <div className="bg-orange-500 text-white p-4 grid grid-cols-4 gap-3 text-center font-bold">
              <span>Jodi</span>
              <span>Point</span>
              <span>Type</span>
              <span>Delete</span>
            </div>
            {betEntries.map((entry) => (
              <div key={entry.id} className="p-4 border-b border-gray-200 grid grid-cols-4 gap-3 items-center text-center">
                <span className="font-bold text-lg">{entry.number}</span>
                <span className="font-bold text-lg">{entry.amount}</span>
                <span className="text-sm bg-orange-100 px-2 py-1 rounded text-orange-700 font-medium">
                  {entry.type}
                </span>
                <button
                  onClick={() => removeBetEntry(entry.id)}
                  className="text-red-500 hover:text-red-700 flex justify-center"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Summary and Submit */}
        {betEntries.length > 0 && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center text-base font-bold">
                <span>Total Bids: {betEntries.length}</span>
                <span>Total Amount: {totalAmount}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Potential Win: ₹{totalAmount * 95}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        )}

        {/* Balance Info */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Available Balance: ₹{user?.balance || 0}
        </div>
      </div>
    </div>
  );
};

export default JodiBulkScreen;
