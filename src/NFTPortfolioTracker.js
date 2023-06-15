import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NFTPortfolioTracker.css';
import './App.css'

const NFTPortfolioTracker = () => {
    const [nfts, setNfts] = useState([]);
    const [address, setAddress] = useState('');
    // Additional state variables if needed
  
    // Component logic goes here
    const fetchNFTs = () => {
        const options = {
          method: 'GET',
          url: `http://localhost:8080/v1/nfts/owner/${address}?chain=eth-main&include_nft_details=true&cursor=7&page_size=20`,
          headers: { accept: 'application/json', 'X-API-KEY': '2jhzbqIWanB8puiqySBIWJVf6Ovp7oPW' },
        };
        
        axios
          .request(options)
          .then(function (response) {
            setNfts(response.data.results);
          })
          .catch(function (error) {
            console.error(error);
          });
      };
      console.log(nfts)
      useEffect(() => {
        fetchNFTs();
      }, []);
      return (
        <div>
          <h1 className='title'>NFT Portfolio Tracker</h1>
          <p>Input NFT token ID and contract address below to see recent transaction price.</p>
          <div className='inputContainer'>
            <input type="text" placeholder="Wallet Address" onChange={(e) => setAddress(e.target.value)} />
            <button onClick={fetchNFTs}>View Portfolio</button>
          </div>
          {nfts.map((nft) => (
            <div key={nft.id}>
              <h2>{nft.nft_details?.token_name || 'N/A'}</h2>
              <img src={nft.nft_details.cached_images.original || 'placeholder-image-url'} alt="NFT Image" />
              {/* Render additional NFT information */}
            </div>
          ))}
        </div>
      );
  };
  
  export default NFTPortfolioTracker;
  