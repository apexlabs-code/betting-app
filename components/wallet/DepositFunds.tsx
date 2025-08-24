"use client";

import React, { useState } from 'react';
import { ArrowLeft, Phone, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface DepositFundsProps {
  onBack: () => void;
}

const DepositFunds: React.FC<DepositFundsProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: amount entry, 2: payment details
  const [transactionId, setTransactionId] = useState('');

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6375017868';
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || 'ankit0panchal@paytm';
  const qrCodeUrl = process.env.NEXT_PUBLIC_QR_CODE_URL || 'https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=QR+Code';

  const handleAmountSubmit = async () => {
    const amountNum = parseFloat(amount);
    
    if (!amount || amountNum < 200 || amountNum > 50000) {
      alert('Amount must be between ₹200 and ₹50,000');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/wallet/deposit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: amountNum,
          upiId: upiId
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setTransactionId(data.transaction.id);
        setStep(2);
      } else {
        alert(data.error || 'Failed to create deposit request');
      }
    } catch (error) {
      console.error('Deposit request error:', error);
      alert('Failed to create deposit request');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      // Update transaction with confirmation
      const response = await fetch('/api/wallet/deposit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          transactionId,
          status: 'submitted',
          reference: `DEP_${Date.now()}`
        })
      });

      if (response.ok) {
        alert('Payment confirmation submitted! Your deposit will be processed within 24 hours.');
        onBack();
      } else {
        alert('Failed to confirm payment');
      }
    } catch (error) {
      console.error('Payment confirmation error:', error);
      alert('Failed to confirm payment');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const message = `Hi, I want to deposit ₹${amount} to my account. My mobile number is ${user?.mobile}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setStep(1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">PAYMENT DETAILS</h1>
            <div className="w-10 h-10"></div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Amount to Pay */}
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Amount to Pay</h2>
            <p className="text-3xl font-bold text-green-600">₹{amount}</p>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Scan QR Code to Pay</h3>
            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code"
                  width={192}
                  height={192}
                  className="rounded-lg"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">Scan with any UPI app to pay</p>
          </div>

          {/* UPI ID */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Or Pay using UPI ID</h3>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-800 font-medium">{upiId}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(upiId)}
                className="text-orange-500 text-sm font-medium"
              >
                COPY
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">Payment Instructions</h3>
            <ol className="text-sm text-orange-700 space-y-1">
              <li>1. Pay the exact amount using UPI</li>
              <li>2. Take a screenshot of payment confirmation</li>
              <li>3. Click "I Have Paid" button below</li>
              <li>4. Amount will be credited within 24 hours</li>
            </ol>
          </div>

          {/* Confirm Payment Button */}
          <button
            onClick={handleConfirmPayment}
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'I HAVE PAID'}
          </button>

          {/* Support */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Need help?</p>
            <button 
              onClick={openWhatsApp}
              className="flex items-center justify-center space-x-2 mx-auto bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} />
              <span>Contact Support</span>
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
          <h1 className="text-lg font-semibold text-gray-800">DEPOSIT FUNDS</h1>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">5</span>
          </div>
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
              max="50000"
            />
          </div>
          <p className="text-red-500 text-sm">*Minimum Deposit 200</p>
        </div>

        {/* Deposit Button */}
        <button
          onClick={handleAmountSubmit}
          disabled={loading || !amount}
          className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'DEPOSIT'}
        </button>

        {/* Support Contact */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">For Fund Related Query</p>
          <button 
            onClick={openWhatsApp}
            className="flex items-center justify-center space-x-2 mx-auto bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} />
            <span>{whatsappNumber}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositFunds;
