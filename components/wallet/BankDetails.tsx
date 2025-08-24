"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface BankDetailsProps {
  onBack: () => void;
}

const BankDetails: React.FC<BankDetailsProps> = ({ onBack }) => {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    paytmNo: '',
    phonePeNo: '',
    googlePayNo: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-fill form with existing data
    if (user) {
      setFormData({
        accountHolderName: user.accountHolderName || '',
        bankName: user.bankName || '',
        accountNumber: user.accountNumber || '',
        ifscCode: user.ifscCode || '',
        paytmNo: user.paytmNo || '',
        phonePeNo: user.phonePeNo || '',
        googlePayNo: user.googlePayNo || ''
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber || !formData.ifscCode) {
      alert('Please fill all required bank details');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/wallet/bank-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Bank details updated successfully!');
        refreshUser(); // Refresh user data in context
        onBack();
      } else {
        alert(data.error || 'Failed to update bank details');
      }
    } catch (error) {
      console.error('Bank details update error:', error);
      alert('Failed to update bank details');
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-lg font-semibold text-gray-800">ADD BANK DETAILS</h1>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">5</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Bank Details Form */}
        <div className="space-y-4">
          {/* Account Holder Name */}
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="flex items-center p-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">⚠️</span>
              </div>
              <input
                type="text"
                placeholder="Account Holder Name"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Bank Name */}
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="flex items-center p-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <Building className="w-4 h-4 text-white" />
              </div>
              <input
                type="text"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Account Number */}
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="flex items-center p-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">#</span>
              </div>
              <input
                type="text"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* IFSC Code */}
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="flex items-center p-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">∞</span>
              </div>
              <input
                type="text"
                placeholder="IFSC Code"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'UPDATE'}
        </button>

        {/* UPI Details */}
        <div className="space-y-4">
          {/* Paytm */}
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center flex-1">
                <span className="text-gray-700 mr-3">Paytm No :-</span>
                <input
                  type="text"
                  placeholder="Enter Paytm number"
                  value={formData.paytmNo}
                  onChange={(e) => handleInputChange('paytmNo', e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <span className="text-orange-500">✏️</span>
            </div>
          </div>

          {/* PhonePe */}
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center flex-1">
                <span className="text-gray-700 mr-3">PhonePe No :-</span>
                <input
                  type="text"
                  placeholder="Enter PhonePe number"
                  value={formData.phonePeNo}
                  onChange={(e) => handleInputChange('phonePeNo', e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <span className="text-orange-500">✏️</span>
            </div>
          </div>

          {/* Google Pay */}
          <div className="bg-white rounded-lg border border-gray-300">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center flex-1">
                <span className="text-gray-700 mr-3">Google Pay No :-</span>
                <input
                  type="text"
                  placeholder="Enter Google Pay number"
                  value={formData.googlePayNo}
                  onChange={(e) => handleInputChange('googlePayNo', e.target.value)}
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <span className="text-orange-500">✏️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
