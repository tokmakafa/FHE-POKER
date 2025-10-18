import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import '../index.css';
import PokerGameABI from '../PokerGameABI.json';

function Game() {
  // State Management
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);
  const [players, setPlayers] = useState([]);
  const [betAmount, setBetAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [balance, setBalance] = useState(null);
  const [myCards, setMyCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [networkError, setNetworkError] = useState(false);

  const CONTRACT_ADDRESS = '0x81C9a38fb4684ac793Ce7b4F940ebBAB171224c0';
  const REQUIRED_CHAIN_ID = 11155111; // Sepolia

  // Game State Labels
  const GAME_STATES = {
    0: 'Waiting for Players',
    1: 'Dealing Cards',
    2: 'Betting Round',
    3: 'Revealing Cards',
    4: 'Game Finished'
  };

  // Connect Wallet
  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        showMessage('Please install MetaMask!', 'error');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      
      // Check if on Sepolia
      if (Number(network.chainId) !== REQUIRED_CHAIN_ID) {
        setNetworkError(true);
        showMessage('Please switch to Sepolia Test Network', 'error');
        return;
      }
      
      setNetworkError(false);
      setAccount(accounts[0]);
      
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(accounts[0]);
      setBalance(ethers.formatEther(balance));
      
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, PokerGameABI, signer);
      setContract(contractInstance);
      
      showMessage('Wallet connected successfully!', 'success');
      await loadGameInfo(contractInstance, accounts[0]);
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showMessage('Failed to connect wallet', 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load Game Information
  const loadGameInfo = useCallback(async (contractInstance = contract, playerAddress = account) => {
    if (!contractInstance) return;
    
    try {
      const info = await contractInstance.getGameInfo();
      const playerCount = await contractInstance.getPlayerCount();
      
      setGameInfo({
        gameState: Number(info._gameState),
        currentPlayers: Number(info._currentPlayers),
        pot: ethers.formatEther(info._pot),
        currentBet: ethers.formatEther(info._currentBet),
        currentPlayerIndex: Number(info._currentPlayerIndex),
        bettingRound: Number(info._bettingRound),
        communityCardsRevealed: Number(info._communityCardsRevealed),
        dealerPosition: Number(info._dealerPosition),
      });

      // Load players
      const playersArray = [];
      for (let i = 0; i < playerCount; i++) {
        const playerInfo = await contractInstance.getPlayerInfo(i);
        playersArray.push({
          address: playerInfo.playerAddress,
          isActive: playerInfo.isActive,
          hasFolded: playerInfo.hasFolded,
          encryptedBet: playerInfo.encryptedBetAmount.toString(),
          publicKey: playerInfo.publicKey.toString(),
        });
      }
      setPlayers(playersArray);

      // Load my cards if I'm a player
      if (playerAddress) {
        try {
          const cards = await contractInstance.getMyEncryptedCards();
          setMyCards([
            { encrypted: cards.encryptedCards[0].toString(), nonce: cards.nonces[0].toString() },
            { encrypted: cards.encryptedCards[1].toString(), nonce: cards.nonces[1].toString() }
          ]);
        } catch (err) {
          console.log('Not a player yet or cards not dealt');
        }
      }

      // Load community cards
      try {
        const commCards = await contractInstance.getCommunityCards();
        const cardsArray = [];
        for (let i = 0; i < Number(commCards.revealed); i++) {
          cardsArray.push({
            encrypted: commCards.encryptedCards[i].toString(),
            nonce: commCards.nonces[i].toString(),
          });
        }
        setCommunityCards(cardsArray);
      } catch (err) {
        console.log('Community cards not available yet');
      }

    } catch (error) {
      console.error('Error loading game info:', error);
    }
  }, [contract, account]);

  // Join Game
  const joinGame = async () => {
    if (!contract) {
      showMessage('Contract not loaded', 'error');
      return;
    }

    try {
      setLoading(true);
      
      const publicKey = ethers.keccak256(ethers.toUtf8Bytes(`${account}-${Date.now()}`));
      console.log('Generated FHE Public Key:', publicKey);
      
      const tx = await contract.joinGame(publicKey);
      await tx.wait();
      
      showMessage('Successfully joined the game! 🎮', 'success');
      await loadGameInfo();
      
    } catch (error) {
      console.error('Error joining game:', error);
      const errorMessage = error.reason || error.message || 'Unknown error';
      showMessage(`Failed to join: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Place Bet
  const placeBet = async () => {
    if (!contract || !betAmount) {
      showMessage('Please enter a bet amount', 'error');
      return;
    }

    try {
      setLoading(true);
      
      const encryptedBetAmount = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['uint256', 'uint256'], 
          [ethers.parseEther(betAmount), Date.now()]
        )
      );
      
      const tx = await contract.placeBet(encryptedBetAmount, { 
        value: ethers.parseEther(betAmount) 
      });
      await tx.wait();
      
      showMessage(`Bet placed: ${betAmount} ETH (encrypted) 🔒`, 'success');
      setBetAmount('');
      await loadGameInfo();
      
    } catch (error) {
      console.error('Error placing bet:', error);
      const errorMessage = error.reason || error.message || 'Unknown error';
      showMessage(`Failed to place bet: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fold
  const fold = async () => {
    if (!contract) {
      showMessage('Contract not loaded', 'error');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.fold();
      await tx.wait();
      
      showMessage('You folded 🃏', 'info');
      await loadGameInfo();
      
    } catch (error) {
      console.error('Error folding:', error);
      showMessage('Failed to fold', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Reset Game (Owner only)
  const resetGame = async () => {
    if (!contract) {
      showMessage('Contract not loaded', 'error');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.resetGame();
      await tx.wait();
      
      showMessage('Game reset successfully! 🔄', 'success');
      await loadGameInfo();
      
    } catch (error) {
      console.error('Error resetting game:', error);
      showMessage('Failed to reset game (Owner only)', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Show Message Helper
  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Format Address
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Check if current player
  const isMyTurn = () => {
    if (!gameInfo || !account) return false;
    const myIndex = players.findIndex(p => p.address.toLowerCase() === account.toLowerCase());
    return myIndex === gameInfo.currentPlayerIndex && gameInfo.gameState === 2;
  };

  // Am I in the game?
  const amIPlayer = () => {
    if (!account) return false;
    return players.some(p => p.address.toLowerCase() === account.toLowerCase());
  };

  // Initialize
  useEffect(() => {
    connectWallet();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          connectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [connectWallet]);

  // Auto-refresh game info
  useEffect(() => {
    if (contract && account) {
      const interval = setInterval(() => {
        loadGameInfo();
      }, 5000); // Refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, [contract, account, loadGameInfo]);

  return (
    <div className="game-page">
      {/* Header */}
      <header className="game-header">
        <div className="app-title">
          <h1>🃏 FHE Poker</h1>
          <span className="badge">Powered by Zama</span>
        </div>
        
        <div className="wallet-info">
          {account ? (
            <>
              <div className="wallet-address">
                <div className="icon"></div>
                <span>{formatAddress(account)}</span>
              </div>
              {balance && (
                <div className="balance-display">
                  {parseFloat(balance).toFixed(4)} ETH
                </div>
              )}
            </>
          ) : (
            <button className="btn btn-primary" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Network Warning */}
      {networkError && (
        <div className="message message-error">
          ⚠️ Please switch to Sepolia Test Network in MetaMask
        </div>
      )}

      {/* Status Message */}
      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Main Content */}
      {account && !networkError && (
        <>
          {/* Game Stats */}
          <div className="game-stats">
            <div className="stat-card">
              <div className="stat-label">Game Status</div>
              <div className="stat-value" style={{ fontSize: '1.25rem' }}>
                {gameInfo ? GAME_STATES[gameInfo.gameState] : 'Loading...'}
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Players</div>
              <div className="stat-value">
                {gameInfo ? `${gameInfo.currentPlayers}/6` : '0/6'}
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Current Pot</div>
              <div className="stat-value">
                {gameInfo ? `${parseFloat(gameInfo.pot).toFixed(4)}` : '0'} ETH
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Current Bet</div>
              <div className="stat-value">
                {gameInfo ? `${parseFloat(gameInfo.currentBet).toFixed(4)}` : '0'} ETH
              </div>
            </div>
          </div>

          {/* Game Table */}
          <div className="card game-table">
            <div className="game-table-inner">
              {/* Poker Table Visual */}
              <div className="poker-table">
                <div className="community-cards">
                  {communityCards.length > 0 ? (
                    communityCards.map((card, index) => (
                      <div key={index} className="playing-card card-hidden" title={`Encrypted: ${card.encrypted.slice(0, 10)}...`}>
                        <span className="card-suit">🔒</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted">Community cards will appear here</div>
                  )}
                </div>
              </div>

              {/* Player's Hand */}
              {amIPlayer() && (
                <div>
                  <h3 className="text-center mb-2">Your Hand (Encrypted)</h3>
                  <div className="player-hand">
                    <div className={`player-card-slot ${myCards.length > 0 ? 'has-card' : ''}`}>
                      {myCards.length > 0 && (
                        <div className="playing-card card-hidden" title={`Encrypted: ${myCards[0]?.encrypted.slice(0, 10)}...`}>
                          <span className="card-suit">🔒</span>
                        </div>
                      )}
                    </div>
                    <div className={`player-card-slot ${myCards.length > 1 ? 'has-card' : ''}`}>
                      {myCards.length > 1 && (
                        <div className="playing-card card-hidden" title={`Encrypted: ${myCards[1]?.encrypted.slice(0, 10)}...`}>
                          <span className="card-suit">🔒</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Game Actions */}
              <div className="card-body mt-3">
                {!amIPlayer() && gameInfo?.gameState === 0 && (
                  <div className="text-center">
                    <button 
                      className="btn btn-primary" 
                      onClick={joinGame}
                      disabled={loading}
                    >
                      {loading ? <span className="loading"></span> : '🎮 Join Game'}
                    </button>
                    <p className="text-muted mt-2">
                      Join the game to start playing! FHE ensures your cards stay private.
                    </p>
                  </div>
                )}

                {amIPlayer() && gameInfo?.gameState === 2 && (
                  <div>
                    <h3 className="text-center mb-2">
                      {isMyTurn() ? "🎯 Your Turn!" : "Waiting for other players..."}
                    </h3>
                    
                    {isMyTurn() && (
                      <div className="action-buttons">
                        <div className="input-group">
                          <label className="input-label">Bet Amount (ETH)</label>
                          <input
                            type="number"
                            step="0.001"
                            className="input-field"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                            placeholder="0.01"
                            disabled={loading}
                          />
                        </div>
                        
                        <button 
                          className="btn btn-success" 
                          onClick={placeBet}
                          disabled={loading || !betAmount}
                        >
                          {loading ? <span className="loading"></span> : '💰 Place Bet'}
                        </button>
                        
                        <button 
                          className="btn btn-danger" 
                          onClick={fold}
                          disabled={loading}
                        >
                          {loading ? <span className="loading"></span> : '🃏 Fold'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {gameInfo?.gameState === 4 && (
                  <div className="text-center">
                    <h3 className="mb-2">🏆 Game Finished!</h3>
                    <button className="btn btn-primary" onClick={resetGame} disabled={loading}>
                      {loading ? <span className="loading"></span> : '🔄 Start New Game'}
                    </button>
                    <p className="text-muted mt-2">Owner can reset the game</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="card mt-3">
            <div className="card-header">
              <h2 className="card-title">👥 Players</h2>
              <span className="text-muted">{players.length} active</span>
            </div>
            
            <div className="players-grid">
              {players.map((player, index) => (
                <div 
                  key={index} 
                  className={`player-item ${player.isActive ? 'active' : ''} ${player.hasFolded ? 'folded' : ''}`}
                >
                  <div className="player-header">
                    <span className="player-address">{formatAddress(player.address)}</span>
                    {index === gameInfo?.dealerPosition && (
                      <span className="player-status status-dealer">Dealer</span>
                    )}
                    {index === gameInfo?.currentPlayerIndex && gameInfo?.gameState === 2 && (
                      <span className="player-status status-active">Current</span>
                    )}
                    {player.hasFolded && (
                      <span className="player-status status-folded">Folded</span>
                    )}
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                    🔑 Key: {player.publicKey.slice(0, 10)}...
                  </div>
                </div>
              ))}
              
              {players.length === 0 && (
                <div className="text-center text-muted">
                  No players yet. Be the first to join!
                </div>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="card mt-3">
            <div className="card-header">
              <h2 className="card-title">ℹ️ About FHE Poker</h2>
            </div>
            <div className="card-body">
              <p className="text-secondary">
                This poker game uses <strong>Fully Homomorphic Encryption (FHE)</strong> principles from Zama 
                to ensure that your cards and bets remain private throughout the game.
              </p>
              <ul className="mt-2" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li className="mt-1">🔒 Your cards are encrypted with your personal FHE key</li>
                <li className="mt-1">💰 Bet amounts are encrypted on-chain</li>
                <li className="mt-1">🎮 Fair gameplay guaranteed by smart contracts</li>
                <li className="mt-1">🌐 Running on Sepolia Test Network</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {!account && (
        <div className="card text-center">
          <div className="card-body">
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎰</h2>
            <h2 className="mb-2">Welcome to FHE Poker</h2>
            <p className="text-secondary mb-3">
              Experience private poker gaming powered by Fully Homomorphic Encryption
            </p>
            <button className="btn btn-primary" onClick={connectWallet}>
              Connect Wallet to Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
