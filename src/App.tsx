import React, { useState } from 'react';
import ScratchCardIntro from './components/ScratchCardIntro';
import RewardPopup from './components/RewardPopup';
import OrderTrackingPage from './components/OrderTrackingPage';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'tracking' | 'scratch' | 'reward'>('tracking');
  const [showReward, setShowReward] = useState(false);

  const handleScratchClick = () => {
    setCurrentScreen('scratch');
  };

  const handleScratchComplete = () => {
    setCurrentScreen('tracking');
    setShowReward(true);
  };

  const handleCloseReward = () => {
    setShowReward(false);
  };

  return (
    <div>
      {currentScreen === 'tracking' && (
        <OrderTrackingPage onScratchClick={handleScratchClick} />
      )}
      
      {currentScreen === 'scratch' && (
        <ScratchCardIntro onComplete={handleScratchComplete} />
      )}

      <RewardPopup 
        isOpen={showReward} 
        onClose={handleCloseReward} 
      />
    </div>
  );
}

export default App;