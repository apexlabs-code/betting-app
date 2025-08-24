"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import WalletChip from '@/components/ui/WalletChip';

interface WithdrawHistoryProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  reference?: string;
  upiId?: string;
  remarks?: string;
  createdAt: string;
}

const WithdrawHistory: React.FC<WithdrawHistoryProps> = ({ onBack }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async (pageNum = 1) => {
    try {
      const response = await fetch(`/api/wallet/transactions?type=withdraw&page=${pageNum}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        if (pageNum === 1) {
          setTransactions(data.transactions);
        } else {
          setTransactions(prev => [...prev, ...data.transactions]);
        }
        setHasMore(data.pagination.hasNext);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Failed to fetch withdrawal history:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setLoading(true);
      fetchTransactions(page + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-orange-600 bg-orange-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const goHome = () => {
    onBack();
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading withdrawal history...</p>
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
          <h1 className="text-lg font-semibold text-gray-800">WITHDRAWAL HISTORY</h1>
          <WalletChip size="md" />
        </div>
      </div>

      <div className="p-4">
        {transactions.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-600 text-lg font-medium mb-6">No withdrawal history available.</p>
            <button
              onClick={goHome}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium"
            >
              Go Home
            </button>
          </div>
        ) : (
          /* Transaction List */
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">-</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Withdrawal Request</h3>
                      <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">-₹{transaction.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                {transaction.reference && (
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Ref: </span>{transaction.reference}
                  </div>
                )}
                
                {transaction.remarks && (
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Remarks: </span>{transaction.remarks}
                  </div>
                )}
              </div>
            ))}

            {/* Load More Button */}
            {hasMore && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawHistory;
