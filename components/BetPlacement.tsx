"use client";

import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WalletChip from '@/components/ui/WalletChip';

interface BetPlacementProps {
  onBack: () => void;
  betType: string;
  betName: string;
  rate: string;
  gameName: string;
}

interface BetEntry {
  id: string;
  number: string;
  amount: number;
  type: 'OPEN' | 'CLOSE';
}

const BetPlacement: React.FC<BetPlacementProps> = ({
  onBack,
  betType,
  betName,
  rate,
  gameName
}) => {
  const { user } = useAuth();
  const [betEntries, setBetEntries] = useState<BetEntry[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>('');
  const [currentAmount, setCurrentAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const addBetEntry = () => {
    if (!currentNumber || !currentAmount) {
      alert('Please enter both number and amount');
      return;
    }

    if (parseInt(currentAmount) < 10) {
      alert('Minimum bet amount is ₹10');
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

  const updateBetAmount = (id: string, newAmount: string) => {
    if (parseInt(newAmount) < 10) return;
    setBetEntries(betEntries.map(entry => 
      entry.id === id ? { ...entry, amount: parseInt(newAmount) } : entry
    ));
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
      // API call to place bets
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Bets placed successfully! Total Amount: ₹${totalAmount}`);
      onBack();
    } catch (error) {
      alert('Failed to place bets');
    } finally {
      setLoading(false);
    }
  };

  const totalBetAmount = betEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const rateMultiplier = parseInt(rate.split(':')[1]) || 9;

  // Render different UI based on bet type
  const renderBetInterface = () => {
    if (betType === 'single-ank') {
      return <SingleAnkInterface />;
    } else if (betType === 'single-ank-bulk') {
      return <BulkInterface />;
    } else if (betType === 'jodi') {
      return <JodiInterface />;
    } else if (betType === 'jodi-bulk') {
      return <BulkInterface />;
    } else {
      return <BulkInterface />;
    }
  };

  // Single Ank Interface (Grid layout)
  const SingleAnkInterface = () => (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-orange-400 text-white text-center py-3 font-bold text-xl">
              {i}
            </div>
            <div className="p-3">
              <input
                type="number"
                placeholder="Amount"
                min="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-center"
                onChange={(e) => {
                  if (e.target.value && parseInt(e.target.value) >= 10) {
                    const existingIndex = betEntries.findIndex(entry => entry.number === i.toString());
                    if (existingIndex >= 0) {
                      updateBetAmount(betEntries[existingIndex].id, e.target.value);
                    } else {
                      const newEntry: BetEntry = {
                        id: Date.now().toString() + i,
                        number: i.toString(),
                        amount: parseInt(e.target.value),
                        type: 'OPEN'
                      };
                      setBetEntries(prev => [...prev.filter(entry => entry.number !== i.toString()), newEntry]);
                    }
                  } else {
                    setBetEntries(prev => prev.filter(entry => entry.number !== i.toString()));
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Jodi Interface (Grid layout for 00-99)
  const JodiInterface = () => (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {Array.from({ length: 100 }, (_, i) => {
          const number = i.toString().padStart(2, '0');
          const existingBet = betEntries.find(entry => entry.number === number);
          
          return (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-orange-400 text-white text-center py-2 font-bold text-lg">
                {number}
              </div>
              <div className="p-2">
                <input
                  type="number"
                  placeholder="₹"
                  min="10"
                  value={existingBet?.amount || ''}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => {
                    if (e.target.value && parseInt(e.target.value) >= 10) {
                      const existingIndex = betEntries.findIndex(entry => entry.number === number);
                      if (existingIndex >= 0) {
                        updateBetAmount(betEntries[existingIndex].id, e.target.value);
                      } else {
                        const newEntry: BetEntry = {
                          id: Date.now().toString() + i,
                          number: number,
                          amount: parseInt(e.target.value),
                          type: 'OPEN'
                        };
                        setBetEntries(prev => [...prev.filter(entry => entry.number !== number), newEntry]);
                      }
                    } else {
                      setBetEntries(prev => prev.filter(entry => entry.number !== number));
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Bulk Interface (Table layout)
  const BulkInterface = () => (
    <div className="p-4 space-y-4">
      {/* Add Entry Form */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <input
            type="text"
            placeholder={betType.includes('jodi') ? 'Jodi' : 'Single Ank'}
            value={currentNumber}
            onChange={(e) => setCurrentNumber(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-center"
          />
          <input
            type="number"
            placeholder="Amount"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            min="10"
            className="px-3 py-2 border border-gray-300 rounded-md text-center"
          />
          <button
            onClick={addBetEntry}
            className="bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Bet Entries Table */}
      {betEntries.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-orange-500 text-white p-3 grid grid-cols-4 gap-3 text-center font-medium">
            <span>{betType.includes('jodi') ? 'Jodi' : 'Single Ank'}</span>
            <span>Point</span>
            <span>Type</span>
            <span>Delete</span>
          </div>
          {betEntries.map((entry) => (
            <div key={entry.id} className="p-3 border-b border-gray-200 grid grid-cols-4 gap-3 items-center text-center">
              <span className="font-medium">{entry.number}</span>
              <span className="font-medium">{entry.amount}</span>
              <span className="text-sm text-gray-600">{entry.type}</span>
              <button
                onClick={() => removeBetEntry(entry.id)}
                className="text-red-500 hover:text-red-700 flex justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

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
            <h1 className="text-lg font-bold text-gray-800">{betName}</h1>
            <p className="text-sm text-gray-600">{gameName}</p>
          </div>
          <WalletChip size="sm" />
        </div>
      </div>

    </div>
  );
};

export default BetPlacement;
