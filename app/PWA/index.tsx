"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MobileLayout from '../../components/MobileLayout';
import AuthScreen from '../../components/auth/AuthScreen';
import { Play } from 'lucide-react';
import Image from 'next/image';

const PWA = () => {
  const { user, isLoading } = useAuth();

  const games = [
    {
      name: 'RADHA MORNING',
      number: '149-41-489',
      status: 'Game Closed',
      openTime: '9:05 AM',
      closeTime: '10:05 AM'
    },
    {
      name: 'DPBOSS MORNING',
      number: '449-78-260',
      status: 'Game Closed',
      openTime: '10:00 AM',
      closeTime: '11:00 AM'
    },
    {
      name: 'KARNATAKA DAY',
      number: '170-81-155',
      status: 'Game Closed',
      openTime: '10:00 AM',
      closeTime: '11:00 AM'
    },
    {
      name: 'MILAN MORNING',
      number: '345-22-570',
      status: 'Game Closed',
      openTime: '10:00 AM',
      closeTime: '11:00 AM'
    }
  ];

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-xl">S777</span>
          </div>
          <p className="text-gray-600">Loading Sara777...</p>
        </div>
      </div>
    );
  }

  // Show authentication screen if user is not logged in
  if (!user) {
    return <AuthScreen />;
  }

  // Show main app if user is authenticated
  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        {/* Welcome Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-600 text-sm text-center">
            Welcome back, <strong>{user.name}</strong>! Balance: ₹{user.balance}
          </p>
        </div>

        {/* Notice Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm text-center">
            Whatsapp se kare or paye 2% bonus | Free
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
            <span>⭐</span>
            <span>KING STARLINE</span>
          </button>
          <button className="bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
            <span>♠</span>
            <span>KING JACKPOT</span>
          </button>
          <button className="bg-green-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
            <span>💳</span>
            <span>DEPOSIT FUND</span>
          </button>
          <button className="bg-purple-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
            <span>₹</span>
            <span>WITHDRAW</span>
          </button>
        </div>

        {/* Contact Numbers */}
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
            <div>
              <Image
                alt='whatsapp'
                src='/whatsapp.png'
                width={24}
                height={24}
              />
            </div>
            <span className="text-green-700 text-sm font-medium">6375017868</span>
          </div>
          <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
            <div>
              <Image
                alt='whatsapp'
                src='/whatsapp.png'
                width={24}
                height={24}
              />
            </div>
            <span className="text-green-700 text-sm font-medium">6375017868</span>
          </div>
        </div>

        {/* Games List */}
        <div className="space-y-3">
          {games.map((game, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">{game.name}</h3>
                  <p className="text-orange-500 font-semibold text-xl">{game.number}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Open Bids</p>
                      <p className="text-sm font-medium">{game.openTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Close Bids</p>
                      <p className="text-sm font-medium">{game.closeTime}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-red-500 text-sm font-medium">{game.status}</span>
                  <button className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
                    <Play className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-gray-500">Play game</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Running Game Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-600 text-sm text-center font-medium">
            Game Running
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PWA;