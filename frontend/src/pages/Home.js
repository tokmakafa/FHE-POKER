import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Powered by Zama FHE</div>
          <h1 className="hero-title">
            Play Poker with <span className="gradient-text">Complete Privacy</span>
          </h1>
          <p className="hero-description">
            Experience the future of online poker with Fully Homomorphic Encryption. 
            Your cards remain encrypted throughout the entire game - not even the blockchain can see them.
          </p>
          
          <div className="hero-buttons">
            <Link to="/game" className="btn btn-primary btn-large">
              🎮 Start Playing
            </Link>
            <Link to="/how-to-play" className="btn btn-secondary btn-large">
              📖 Learn How
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Private</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0%</div>
              <div className="stat-label">Trust Required</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Security</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-cards">
            <div className="card-float card-1">🂡</div>
            <div className="card-float card-2">🂱</div>
            <div className="card-float card-3">🃁</div>
            <div className="card-float card-4">🃑</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose FHE Poker?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Fully Encrypted</h3>
            <p>Cards and bets are encrypted using homomorphic encryption - impossible to cheat or peek.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Gameplay</h3>
            <p>Play directly on Ethereum Sepolia with fast transactions and real-time updates.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Provably Fair</h3>
            <p>Smart contracts ensure fairness - no house advantage, no manipulation possible.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Decentralized</h3>
            <p>No central server, no accounts - just connect your wallet and play.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Low Fees</h3>
            <p>Play on testnet for free or enjoy low gas fees on Ethereum mainnet.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure by Design</h3>
            <p>Built with Zama's FHE technology - cryptographically secure by default.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        
        <div className="steps-grid">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>Connect Wallet</h3>
            <p>Connect your MetaMask wallet to the Sepolia network</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-item">
            <div className="step-number">2</div>
            <h3>Join Game</h3>
            <p>Your FHE key is generated and you join the poker table</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-item">
            <div className="step-number">3</div>
            <h3>Play Poker</h3>
            <p>Cards are encrypted, bets are placed, winner takes all</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-item">
            <div className="step-number">4</div>
            <h3>Win & Repeat</h3>
            <p>Collect your winnings and start a new game</p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="tech-section">
        <div className="tech-content">
          <div className="tech-text">
            <h2>Powered by Cutting-Edge Technology</h2>
            <p>
              FHE Poker uses <strong>Fully Homomorphic Encryption</strong> from Zama, 
              allowing computations on encrypted data without ever decrypting it.
            </p>
            <ul className="tech-features">
              <li>✅ Your cards never leave encrypted state</li>
              <li>✅ Mathematical guarantee of privacy</li>
              <li>✅ Blockchain-level security</li>
              <li>✅ Zero-knowledge proofs</li>
            </ul>
            <Link to="/about" className="btn btn-primary">
              Learn More About FHE
            </Link>
          </div>

          <div className="tech-visual">
            <div className="tech-box">
              <div className="code-snippet">
                <code>
                  {`// Your cards are encrypted
const encryptedCard = 
  FHE.encrypt(card, publicKey);

// Operations on encrypted data
const bet = FHE.add(
  encryptedAmount, 
  currentBet
);

// No one can see the values!`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Play Private Poker?</h2>
          <p>Join the future of blockchain gaming today</p>
          <Link to="/game" className="btn btn-primary btn-large">
            🚀 Launch Game
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

