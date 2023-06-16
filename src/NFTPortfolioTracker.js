import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NFTPortfolioTracker.css';
import './App.css'

const NFTPortfolioTracker = () => {
    const [blockchain, setBlockchain] = useState('eth-main');
    const [nfts, setNfts] = useState(null);
    const [address, setAddress] = useState('');
    // Additional state variables if needed
  
    // Component logic goes here
    const fetchNFTs = () => {
        const options = {
          method: 'GET',
          url: `http://localhost:8080/v1/nfts/owner/${address}?chain=${blockchain}&include_nft_details=true&cursor=7&page_size=20`,
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
      const handleBlockchainChange = (event) => {
        setBlockchain(event.target.value);
      };
      return (
        <div>
          <h1 className='title'>NFT Portfolio Tracker</h1>
          <p className='message'>Select a chain and input a wallet address below to see what NFTs that wallet owns.</p>
          <div className='inputContainer'>
            <select name='blockchain' value={blockchain} onChange={handleBlockchainChange}>
              <option value="eth-main">eth-main</option>
              <option value="arbitrum-main">arbitrum-main</option>
              <option value="optimism-main">optimism-main</option>
              <option value="poly-main">poly-main</option>
              <option value="bsc-main">bsc-main</option>
              <option value="eth-goerli">eth-goerli</option>
            </select>
            <input type="text" placeholder="Wallet Address" onChange={(e) => setAddress(e.target.value)} />
            <button onClick={fetchNFTs}>View Portfolio</button>
          </div>
          {nfts && (
            <table>
              <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Token Name</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Id</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Token Type</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Contract Address</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Image</th>
                  </tr>
              </thead>
              <tbody>
                  {nfts.map((nft, index) => (
                    console.log(nft),
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                        <td style={{ padding: '10px', textAlign: 'left' }}>{nft.nft_details.token_name}</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>{nft.id}</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>{nft.token_type}</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>{nft.contract_address}</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}><img src={nft.nft_details.cached_images.tiny_100_100}/></td>
                      </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      );
  };
  
  export default NFTPortfolioTracker;
  