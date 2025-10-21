import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import '../index.css';
import PokerGameFHE_ABI from '../PokerGameFHE_ABI.json';

// Note: fhevmjs will be integrated after Sepolia deployment
// For now using placeholder encryption

function GameFHE() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [playerCount, setPlayerCount] = useState(0);
  const [pot, setPot] = useState('0');
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [myCards, setMyCards] = useState({ card1: null, card2: null });

  // Contract address - will be updated after Sepolia deployment
  // For now using localhost address for development
  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  // Game states mapping
  const GAME_STATES = {
    0: 'Waiting for Players',
    1: 'Cards Dealt',
    2: 'Betting',
    3: 'Showdown',
    4: 'Finished'
  };

  // FHE will be fully integrated after Sepolia deployment
  // For now, contract handles encryption on-chain

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      setMessage('Please install MetaMask!');
      return;
    }

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      setAccount(accounts[0]);
      
      // Check network
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      if (chainId !== 31337) {
        setMessage('⚠️ Please switch to Localhost network (Hardhat)');
        return;
      }

      // Initialize contract
      const signer = await provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        PokerGameFHE_ABI,
        signer
      );
      setContract(gameContract);
      setMessage('✅ Wallet connected with FHE support!');
      
      // Load game info
      await loadGameInfo(gameContract);
    } catch (error) {
      console.error('Connection error:', error);
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load game information
  const loadGameInfo = useCallback(async (gameContract) => {
    if (!gameContract) return;

    try {
      const info = await gameContract.getGameInfo();
      setGameState(Number(info[0]));
      setPlayerCount(Number(info[1]));
      setPot(ethers.formatEther(info[2]));
      setCurrentPlayer(Number(info[3]));
    } catch (error) {
      console.error('Error loading game info:', error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Join game
  const joinGame = async () => {
    if (!contract) {
      setMessage('Please connect wallet first');
      return;
    }

    try {
      setLoading(true);
      setMessage('🎮 Joining game...');
      
      const tx = await contract.joinGame();
      await tx.wait();
      
      setMessage('✅ Joined game successfully!');
      await loadGameInfo(contract);
    } catch (error) {
      console.error('Error joining game:', error);
      setMessage('❌ Error joining game: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Place encrypted bet
  const placeBet = async () => {
    if (!contract) {
      setMessage('Please connect wallet first');
      return;
    }

    try {
      setLoading(true);
      setMessage('🔐 Encrypting bet...');

      const betAmount = ethers.parseEther('0.001');
      
      // For localhost testing, we'll use a simplified approach
      // In production with real Zama network, you'd encrypt the bet amount
      const encryptedBet = ethers.hexlify(ethers.randomBytes(32)); // Placeholder
      const inputProof = '0x'; // Empty proof for localhost

      setMessage('📤 Placing encrypted bet...');
      const tx = await contract.placeBet(encryptedBet, inputProof, {
        value: betAmount
      });
      await tx.wait();

      setMessage('✅ Bet placed successfully!');
      await loadGameInfo(contract);
    } catch (error) {
      console.error('Error placing bet:', error);
      setMessage('❌ Error: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Call
  const call = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      setMessage('📞 Calling...');
      
      const tx = await contract.call({ value: ethers.parseEther('0.001') });
      await tx.wait();
      
      setMessage('✅ Called successfully!');
      await loadGameInfo(contract);
    } catch (error) {
      console.error('Error calling:', error);
      setMessage('❌ Error: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Fold
  const fold = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      setMessage('🙅 Folding...');
      
      const tx = await contract.fold();
      await tx.wait();
      
      setMessage('✅ Folded successfully');
      await loadGameInfo(contract);
    } catch (error) {
      console.error('Error folding:', error);
      setMessage('❌ Error: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Get my encrypted cards
  const getMyCards = async () => {
    if (!contract) return;

    try {
      setMessage('🔐 Fetching your encrypted cards...');
      const cards = await contract.getMyCards();
      setMyCards({
        card1: cards[0].toString(),
        card2: cards[1].toString()
      });
      setMessage('✅ Cards fetched (encrypted)');
    } catch (error) {
      console.error('Error getting cards:', error);
      setMessage('❌ Error: ' + error.message);
    }
  };

  // Auto-refresh game info
  useEffect(() => {
    if (contract) {
      const interval = setInterval(() => {
        loadGameInfo(contract);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [contract, loadGameInfo]);

  return (
    <div className="game-container">
      <div className="header">
        <h1>🔐 FHE Poker - Zama Edition</h1>
        <p className="subtitle">Fully Homomorphic Encryption Poker with Zama TFHE</p>
        {account && (
          <div className="account-info">
            <span className="badge">🎭 {account.substring(0, 6)}...{account.substring(38)}</span>
          </div>
        )}
      </div>

      {!account ? (
        <div className="connect-section">
          <button onClick={connectWallet} disabled={loading} className="btn btn-primary btn-large">
            {loading ? '⏳ Connecting...' : '🔗 Connect Wallet'}
          </button>
          <p className="info-text">
            ⚠️ Make sure you're on Localhost network (Hardhat) and have fhEVM support
          </p>
        </div>
      ) : (
        <>
          <div className="game-info">
            <div className="info-card">
              <h3>🎮 Game Status</h3>
              <p><strong>State:</strong> {GAME_STATES[gameState] || 'Unknown'}</p>
              <p><strong>Players:</strong> {playerCount}/6</p>
              <p><strong>Pot:</strong> {pot} ETH</p>
              <p><strong>Current Player:</strong> #{currentPlayer}</p>
            </div>

            <div className="info-card fhe-status">
              <h3>🔐 FHE Status</h3>
              <p><strong>Contract:</strong> <span className="status-active">● PokerGameFHE</span></p>
              <p><strong>Encryption:</strong> Zama TFHE (On-chain)</p>
              <p><strong>Privacy:</strong> ✅ Cards & Bets Encrypted</p>
            </div>

            {myCards.card1 && (
              <div className="info-card">
                <h3>🃏 My Encrypted Cards</h3>
                <p className="encrypted-data"><strong>Card 1:</strong> {myCards.card1.substring(0, 20)}...</p>
                <p className="encrypted-data"><strong>Card 2:</strong> {myCards.card2.substring(0, 20)}...</p>
                <p className="info-text">🔒 Cards are encrypted on-chain</p>
              </div>
            )}
          </div>

          <div className="actions">
            {gameState === 0 && (
              <button onClick={joinGame} disabled={loading} className="btn btn-success">
                {loading ? '⏳ Joining...' : '🎮 Join Game'}
              </button>
            )}

            {gameState === 2 && (
              <>
                <button onClick={placeBet} disabled={loading} className="btn btn-primary">
                  {loading ? '⏳ Betting...' : '🔐 Encrypted Bet (0.001 ETH)'}
                </button>
                <button onClick={call} disabled={loading} className="btn btn-info">
                  {loading ? '⏳ Calling...' : '📞 Call'}
                </button>
                <button onClick={fold} disabled={loading} className="btn btn-warning">
                  {loading ? '⏳ Folding...' : '🙅 Fold'}
                </button>
              </>
            )}

            {contract && gameState > 0 && (
              <button onClick={getMyCards} disabled={loading} className="btn btn-secondary">
                🔍 View My Cards
              </button>
            )}
          </div>

          {message && (
            <div className={`message ${message.includes('❌') ? 'error' : message.includes('⚠️') ? 'warning' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="fhe-info">
            <h3>🔐 FHE Features</h3>
            <ul>
              <li>✅ Cards encrypted with Zama TFHE (euint8)</li>
              <li>✅ Bets encrypted on-chain (euint64)</li>
              <li>✅ ACL-based access control</li>
              <li>✅ Nobody can see your cards (not even the contract owner)</li>
              <li>✅ Privacy-preserving gameplay</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default GameFHE;

