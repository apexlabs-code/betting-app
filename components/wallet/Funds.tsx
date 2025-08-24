"use client";

import React, { useState } from 'react';
import ManageFunds from './ManageFunds';
import DepositFunds from './DepositFunds';
import WithdrawFund from './WithdrawFund';
import BankDetails from './BankDetails';
import DepositHistory from './DepositHistory';
import WithdrawHistory from './WithdrawHistory';

interface FundsProps {
  onBack: () => void;
}

const Funds: React.FC<FundsProps> = ({ onBack }) => {
  const [currentScreen, setCurrentScreen] = useState('ManageFunds');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (currentScreen === 'ManageFunds') {
      onBack();
    } else {
      setCurrentScreen('ManageFunds');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'ManageFunds':
        return <ManageFunds onBack={handleBack} onNavigate={handleNavigate} />;
      case 'DepositFunds':
        return <DepositFunds onBack={handleBack} />;
      case 'WithdrawFund':
        return <WithdrawFund onBack={handleBack} onNavigate={handleNavigate} />;
      case 'BankDetails':
        return <BankDetails onBack={handleBack} />;
      case 'DepositHistory':
        return <DepositHistory onBack={handleBack} />;
      case 'WithdrawHistory':
        return <WithdrawHistory onBack={handleBack} />;
      default:
        return <ManageFunds onBack={handleBack} onNavigate={handleNavigate} />;
    }
  };

  return <div className="mb-20">{renderScreen()}</div>
};

export default Funds;
