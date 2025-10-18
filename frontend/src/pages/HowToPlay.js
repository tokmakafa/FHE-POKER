import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HowToPlay.css';

function HowToPlay() {
  return (
    <div className="how-to-play-page">
      <div className="page-header">
        <h1>🎮 How to Play FHE Poker</h1>
        <p>Your complete guide to private poker on the blockchain</p>
      </div>

      {/* Getting Started */}
      <section className="guide-section">
        <h2>🚀 Getting Started</h2>
        
        <div className="steps-list">
          <div className="step-card">
            <div className="step-icon">1</div>
            <div className="step-content">
              <h3>Install MetaMask</h3>
              <p>Download and install the MetaMask browser extension from <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">metamask.io</a></p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">2</div>
            <div className="step-content">
              <h3>Switch to Sepolia Network</h3>
              <p>In MetaMask, click the network dropdown and select "Sepolia Test Network"</p>
              <div className="info-box">
                <strong>Don't see Sepolia?</strong> Enable "Show test networks" in MetaMask settings
              </div>
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">3</div>
            <div className="step-content">
              <h3>Get Test ETH</h3>
              <p>Get free Sepolia ETH from these faucets:</p>
              <ul>
                <li><a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer">sepoliafaucet.com</a></li>
                <li><a href="https://faucet.quicknode.com/ethereum/sepolia" target="_blank" rel="noopener noreferrer">QuickNode Faucet</a></li>
                <li><a href="https://www.alchemy.com/faucets/ethereum-sepolia" target="_blank" rel="noopener noreferrer">Alchemy Faucet</a></li>
              </ul>
            </div>
          </div>

          <div className="step-card">
            <div className="step-icon">4</div>
            <div className="step-content">
              <h3>Connect Wallet</h3>
              <p>Click "Connect Wallet" button on the game page and approve the connection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Rules */}
      <section className="guide-section">
        <h2>🎲 Game Rules</h2>
        
        <div className="rules-grid">
          <div className="rule-card">
            <h3>Players</h3>
            <p>2-6 players can join each game. Minimum 2 players required to start.</p>
          </div>

          <div className="rule-card">
            <h3>Buy-in</h3>
            <p>No fixed buy-in required. Players can bet any amount during the game.</p>
          </div>

          <div className="rule-card">
            <h3>Cards</h3>
            <p>Each player receives 2 encrypted cards. 5 community cards are dealt.</p>
          </div>

          <div className="rule-card">
            <h3>Betting</h3>
            <p>Players take turns betting, folding, or checking. All bets are encrypted.</p>
          </div>

          <div className="rule-card">
            <h3>Winner</h3>
            <p>Best poker hand wins. Winner takes the entire pot.</p>
          </div>

          <div className="rule-card">
            <h3>Privacy</h3>
            <p>Your cards remain encrypted throughout - no one can see them!</p>
          </div>
        </div>
      </section>

      {/* Gameplay */}
      <section className="guide-section">
        <h2>🃏 Gameplay Flow</h2>
        
        <div className="gameplay-timeline">
          <div className="timeline-item">
            <div className="timeline-badge">1</div>
            <div className="timeline-content">
              <h3>Waiting for Players</h3>
              <p>Players join the game table. An FHE public key is generated for each player.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-badge">2</div>
            <div className="timeline-content">
              <h3>Dealing Cards</h3>
              <p>Once minimum players join, cards are shuffled and dealt. Each player receives 2 encrypted cards.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-badge">3</div>
            <div className="timeline-content">
              <h3>Pre-Flop Betting</h3>
              <p>First betting round. Players can place encrypted bets or fold.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-badge">4</div>
            <div className="timeline-content">
              <h3>The Flop</h3>
              <p>3 community cards are revealed. Another betting round begins.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-badge">5</div>
            <div className="timeline-content">
              <h3>The Turn</h3>
              <p>4th community card is revealed. Betting continues.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-badge">6</div>
            <div className="timeline-content">
              <h3>The River</h3>
              <p>5th and final community card is revealed. Final betting round.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-badge">7</div>
            <div className="timeline-content">
              <h3>Showdown</h3>
              <p>Remaining players reveal cards. Best hand wins the pot!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="guide-section">
        <h2>🎯 Player Actions</h2>
        
        <div className="actions-grid">
          <div className="action-card">
            <div className="action-icon">💰</div>
            <h3>Place Bet</h3>
            <p>Enter an amount in ETH and place your encrypted bet. The amount is added to the pot.</p>
          </div>

          <div className="action-card">
            <div className="action-icon">🃏</div>
            <h3>Fold</h3>
            <p>Give up your hand and exit the current round. You can't win this pot.</p>
          </div>

          <div className="action-card">
            <div className="action-icon">✅</div>
            <h3>Check</h3>
            <p>Pass the action to next player without betting (if no bet has been made).</p>
          </div>

          <div className="action-card">
            <div className="action-icon">⬆️</div>
            <h3>Raise</h3>
            <p>Increase the current bet amount. Other players must match or fold.</p>
          </div>
        </div>
      </section>

      {/* FHE Explanation */}
      <section className="guide-section fhe-section">
        <h2>🔐 What is FHE?</h2>
        
        <div className="fhe-content">
          <p>
            <strong>Fully Homomorphic Encryption (FHE)</strong> is a form of encryption that 
            allows computations to be performed on encrypted data without decrypting it first.
          </p>

          <div className="fhe-example">
            <h4>Traditional Encryption:</h4>
            <div className="code-box">
              <code>Encrypt → Decrypt → Compute → Encrypt</code>
              <p className="code-label danger">❌ Data exposed during computation</p>
            </div>

            <h4>Homomorphic Encryption:</h4>
            <div className="code-box">
              <code>Encrypt → Compute on Encrypted Data → Decrypt Result</code>
              <p className="code-label success">✅ Data always encrypted</p>
            </div>
          </div>

          <div className="fhe-benefits">
            <h4>Benefits in Poker:</h4>
            <ul>
              <li>🔒 Your cards are never visible to anyone</li>
              <li>🔒 Bet amounts are encrypted on-chain</li>
              <li>🔒 Smart contract can process bets without seeing amounts</li>
              <li>🔒 Complete privacy from other players and observers</li>
            </ul>
          </div>

          <Link to="/about" className="btn btn-primary">
            Learn More About FHE Technology
          </Link>
        </div>
      </section>

      {/* Tips */}
      <section className="guide-section">
        <h2>💡 Pro Tips</h2>
        
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">⚡</div>
            <p><strong>Gas Fees:</strong> Transactions on Sepolia are free (test ETH). On mainnet, consider gas prices before betting.</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🔄</div>
            <p><strong>Auto-Refresh:</strong> The game auto-refreshes every 5 seconds. You can manually refresh to see latest updates.</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🎲</div>
            <p><strong>Strategy:</strong> Remember, your cards are encrypted - other players can't see them even on the blockchain!</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🛡️</div>
            <p><strong>Security:</strong> Never share your private key. FHE protects your cards, but you must protect your wallet.</p>
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="guide-section">
        <h2>❓ Quick FAQ</h2>
        
        <div className="faq-list">
          <details className="faq-item">
            <summary>Can other players see my cards?</summary>
            <p>No! Your cards are encrypted with your personal FHE key. Not even the blockchain can see them.</p>
          </details>

          <details className="faq-item">
            <summary>Is this real poker?</summary>
            <p>Yes! It follows standard Texas Hold'em poker rules with the added benefit of FHE encryption.</p>
          </details>

          <details className="faq-item">
            <summary>Do I need real ETH?</summary>
            <p>On Sepolia testnet, you use free test ETH. On mainnet, you would use real ETH.</p>
          </details>

          <details className="faq-item">
            <summary>How many players can play?</summary>
            <p>Between 2 to 6 players per game table.</p>
          </details>

          <details className="faq-item">
            <summary>Can the game be rigged?</summary>
            <p>No! Smart contracts are transparent and auditable. FHE ensures no one can cheat.</p>
          </details>
        </div>

        <div className="more-questions">
          <p>More questions?</p>
          <Link to="/faq" className="btn btn-secondary">
            View Full FAQ
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Play?</h2>
        <p>Now that you know how it works, join a game!</p>
        <Link to="/game" className="btn btn-primary btn-large">
          🎮 Start Playing Now
        </Link>
      </section>
    </div>
  );
}

export default HowToPlay;

