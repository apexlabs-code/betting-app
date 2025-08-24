"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import WalletChip from '@/components/ui/WalletChip';
import Image from 'next/image';

interface WithdrawFundProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const WithdrawFund: React.FC<WithdrawFundProps> = ({ onBack, onNavigate }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasBankDetails, setHasBankDetails] = useState(false);
  const [showBankSelection, setShowBankSelection] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6375017868';

  useEffect(() => {
    // Check if user has bank details
    if (user?.accountHolderName && user?.bankName && user?.accountNumber && user?.ifscCode) {
      setHasBankDetails(true);
    }
  }, [user]);

  const handleWithdrawRequest = async () => {
    const amountNum = parseFloat(amount);
    
    if (!amount || amountNum < 200) {
      alert('Minimum withdrawal amount is ₹200');
      return;
    }

    if (!user?.balance || user.balance < amountNum) {
      alert('Insufficient balance');
      return;
    }

    if (!hasBankDetails) {
      alert('Please add your bank details first');
      onNavigate('BankDetails');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/wallet/withdraw-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          amount: amountNum
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Withdrawal request submitted successfully! It will be processed within 24 hours.');
        onBack();
      } else {
        alert(data.error || 'Failed to submit withdrawal request');
      }
    } catch (error) {
      console.error('Withdrawal request error:', error);
      alert('Failed to submit withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const message = `Hi, I have a query regarding withdrawal. My mobile number is ${user?.mobile}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const selectWithdrawalMethod = () => {
    if (!hasBankDetails) {
      alert('Please add your bank details first');
      onNavigate('BankDetails');
      return;
    }
    setShowBankSelection(true);
  };

  if (showBankSelection) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setShowBankSelection(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">WITHDRAW FUND</h1>
            <WalletChip size="md" />
          </div>
        </div>

        <div className="p-4">
          {/* User Info Card */}
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="bg-black text-white p-3 rounded-lg text-center mb-4">
              <p className="font-semibold">{user?.name || 'User'}</p>
              <p className="text-sm">{user?.mobile || '0000000000'}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Available Balance</span>
              <span className="text-xl font-bold">₹{user?.balance || 0}</span>
            </div>
            <div className="flex justify-end mt-2">
              <div className="flex space-x-1">
                <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Select Withdrawal Method Modal */}
          <div className="bg-white rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-orange-500 mb-4">Select Withdrawal Method</h2>
            
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🏦</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{user?.bankName}</p>
                    <p className="text-sm text-gray-600">**** **** {user?.accountNumber?.slice(-4)}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              </div>
            </div>

            <button
              onClick={() => setShowBankSelection(false)}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold mb-3"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold text-gray-800">WITHDRAW FUND</h1>
          <WalletChip size="md" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-lg p-4">
          <div className="bg-black text-white p-3 rounded-lg text-center mb-4">
            <p className="font-semibold">{user?.name || 'User'}</p>
            <p className="text-sm">{user?.mobile || '0000000000'}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Available Balance</span>
            <span className="text-xl font-bold">₹{user?.balance || 0}</span>
          </div>
          <div className="flex justify-end mt-2">
            <div className="flex space-x-1">
              <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
              <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Support Contact */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">For Withdraw Related Query</p>
          <button 
            onClick={openWhatsApp}
            className="flex items-center justify-center space-x-2 mx-auto bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} />
            <span>{whatsappNumber}</span>
          </button>
        </div>

        {/* Withdraw Time Notice */}
        <div className="text-center text-red-500 text-sm">
          *Withdraw Time 9:00 AM to 8:00 PM
        </div>

        {/* Amount Input */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">₹</span>
            </div>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 text-lg font-semibold border-none outline-none"
              min="200"
            />
          </div>
        </div>

        {/* Bank Details Status */}
        {!hasBankDetails ? (
          <div className="text-center">
            <p className="text-red-500 font-medium mb-4">No Linked Withdraw Method Found</p>
            <button
              onClick={() => onNavigate('BankDetails')}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Add Bank
            </button>
          </div>
        ) : (
          <button
            onClick={selectWithdrawalMethod}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold"
          >
            SELECT WITHDRAWAL METHOD
          </button>
        )}

        {/* Withdraw Button */}
        {hasBankDetails && (
          <button
            onClick={handleWithdrawRequest}
            disabled={loading || !amount}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'REQUEST WITHDRAWAL'}
          </button>
        )}

        {/* View History Button */}
        <button
          onClick={() => onNavigate('WithdrawHistory')}
          className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold"
        >
          VIEW WITHDRAW HISTORY
        </button>
      </div>
    </div>
  );
};

export default WithdrawFund;
