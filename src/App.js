import React from 'react';
import NFTPortfolioTracker from './NFTPortfolioTracker.js';

function App() {
  const ownerAddress = "0xf5e2c17439e71cd96646d63ddd13bf63dad5f7f4";

  return (
    <div className="App">
      <h1>NFT Portfolio Tracker</h1>
      <NFTPortfolioTracker owner_address={ownerAddress} />
    </div>
  );
}

export default App;