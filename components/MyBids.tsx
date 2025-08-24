"use client";

import React from 'react';
import { ArrowLeft, ClipboardList, Calendar, TrendingUp } from 'lucide-react';

interface MyBidsProps {
  onBack?: () => void;
}

const MyBids: React.FC<MyBidsProps> = ({ onBack }) => {
  const sampleBids = [
    {
      game: 'RADHA MORNING',
      bidType: 'Single',
      number: '5',
      amount: '₹100',
      date: '24 Aug 2025',
      status: 'Pending',
      time: '9:00 AM'
    },
    {
      game: 'DPBOSS MORNING',
      bidType: 'Jodi',
      number: '45',
      amount: '₹50',
      date: '24 Aug 2025',
      status: 'Lost',
      time: '10:00 AM'
    },
    {
      game: 'MILAN MORNING',
      bidType: 'Single Pana',
      number: '123',
      amount: '₹200',
      date: '23 Aug 2025',
      status: 'Won',
      time: '10:30 AM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
            <h1 className="text-lg font-semibold text-gray-800">MY BIDS</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-blue-600 font-bold text-lg">12</div>
            <div className="text-blue-600 text-xs">Total Bids</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-green-600 font-bold text-lg">3</div>
            <div className="text-green-600 text-xs">Won</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <div className="text-red-600 font-bold text-lg">9</div>
            <div className="text-red-600 text-xs">Lost</div>
          </div>
        </div>

        {/* Bids List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 mb-3">Recent Bids</h3>
          {sampleBids.map((bid, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ClipboardList className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-gray-800">{bid.game}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  bid.status === 'Won' ? 'bg-green-100 text-green-800' :
                  bid.status === 'Lost' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {bid.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Bid Type</p>
                  <p className="font-medium">{bid.bidType}</p>
                </div>
                <div>
                  <p className="text-gray-500">Number</p>
                  <p className="font-medium">{bid.number}</p>
                </div>
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-medium text-orange-600">{bid.amount}</p>
                </div>
                <div>
                  <p className="text-gray-500">Time</p>
                  <p className="font-medium">{bid.time}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-gray-500 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{bid.date}</span>
                </div>
                <button className="text-blue-600 text-xs font-medium hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State or Load More */}
        <div className="text-center mt-6">
          <button className="text-blue-600 font-medium hover:underline">
            Load More Bids
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBids;
