"use client";

import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface LoginProps {
  onSwitchToRegister: () => void;
  prefilledMobile?: string;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister, prefilledMobile = '' }) => {
  const [mobile, setMobile] = useState(prefilledMobile);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(mobile, password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-8 bg-orange-500 rounded"></div>
            <h1 className="text-xl font-bold text-gray-800">LOGIN TO YOUR ACCOUNT</h1>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
            <Phone className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-2 mx-auto">
              <Image 
                src="/logo.png" 
                alt="Sara777" 
                width={60} 
                height={60}
                className="rounded-full"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-white font-bold text-xl absolute inset-0 flex items-center justify-center">
                S777
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sara777</h2>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mobile Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Phone className="w-5 h-5 text-orange-500" />
            </div>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder={prefilledMobile || "888866644"}
              className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              required
              maxLength={10}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Lock className="w-5 h-5 text-orange-500" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full pl-12 pr-12 py-4 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-gray-600 text-sm hover:text-gray-800 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              Register
            </button>
          </p>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-2">Contact Support</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">6375017868</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
