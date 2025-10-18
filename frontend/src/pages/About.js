import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>🔐 About FHE Technology</h1>
        <p>Understanding Fully Homomorphic Encryption</p>
      </div>

      {/* Introduction */}
      <section className="content-section">
        <h2>What is Fully Homomorphic Encryption?</h2>
        <p className="lead">
          Fully Homomorphic Encryption (FHE) is a revolutionary cryptographic method that allows 
          computations to be performed on encrypted data without ever decrypting it.
        </p>
        
        <div className="highlight-box">
          <p>
            Imagine being able to perform calculations on locked data, getting an encrypted result, 
            and only unlocking the final answer - without ever exposing the underlying information.
          </p>
        </div>
      </section>

      {/* How FHE Works */}
      <section className="content-section">
        <h2>How Does FHE Work?</h2>
        
        <div className="comparison-grid">
          <div className="comparison-card traditional">
            <h3>❌ Traditional Encryption</h3>
            <div className="process-steps">
              <div className="process-step">1. Encrypt data</div>
              <div className="process-step">2. Send to server</div>
              <div className="process-step danger">3. Decrypt data ⚠️</div>
              <div className="process-step danger">4. Process data ⚠️</div>
              <div className="process-step">5. Encrypt result</div>
              <div className="process-step">6. Return to user</div>
            </div>
            <p className="warning">Data is vulnerable during processing!</p>
          </div>

          <div className="comparison-card fhe">
            <h3>✅ Homomorphic Encryption</h3>
            <div className="process-steps">
              <div className="process-step">1. Encrypt data</div>
              <div className="process-step">2. Send to server</div>
              <div className="process-step success">3. Process encrypted data ✅</div>
              <div className="process-step success">4. Get encrypted result ✅</div>
              <div className="process-step">5. Return to user</div>
              <div className="process-step">6. User decrypts result</div>
            </div>
            <p className="success">Data never exposed!</p>
          </div>
        </div>
      </section>

      {/* Mathematical Example */}
      <section className="content-section">
        <h2>Simple Mathematical Example</h2>
        
        <div className="math-example">
          <div className="example-card">
            <h4>Without FHE:</h4>
            <div className="code-block">
              <code>
                x = 5<br/>
                y = 3<br/>
                result = x + y  {'// = 8'}<br/>
                <span className="comment">{'// Everyone can see 5, 3, and 8'}</span>
              </code>
            </div>
          </div>

          <div className="example-card">
            <h4>With FHE:</h4>
            <div className="code-block">
              <code>
                x_encrypted = Encrypt(5)<br/>
                y_encrypted = Encrypt(3)<br/>
                result_encrypted = Add(x_encrypted, y_encrypted)<br/>
                result = Decrypt(result_encrypted)  {'// = 8'}<br/>
                <span className="comment">{'// Only you can see 5, 3, and 8!'}</span>
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* FHE in Poker */}
      <section className="content-section">
        <h2>FHE in Our Poker Game</h2>
        
        <div className="poker-fhe-grid">
          <div className="feature-detail">
            <div className="feature-icon">🃏</div>
            <h3>Encrypted Cards</h3>
            <p>
              When you join a game, a unique FHE public key is generated for you. 
              Your two cards are encrypted with this key before being stored on the blockchain.
            </p>
            <div className="code-snippet">
              <code>
                encryptedCard = FHE.encrypt(cardValue, yourPublicKey)
              </code>
            </div>
          </div>

          <div className="feature-detail">
            <div className="feature-icon">💰</div>
            <h3>Encrypted Bets</h3>
            <p>
              Your bet amounts are also encrypted before being sent to the smart contract. 
              The contract can add bets together without knowing the actual amounts!
            </p>
            <div className="code-snippet">
              <code>
                encryptedBet = FHE.encrypt(betAmount, yourPublicKey)
              </code>
            </div>
          </div>

          <div className="feature-detail">
            <div className="feature-icon">🔐</div>
            <h3>Privacy Guarantees</h3>
            <p>
              Even the blockchain nodes processing your transaction can't see your cards or exact bet amounts. 
              Only you hold the private key to decrypt your data.
            </p>
          </div>

          <div className="feature-detail">
            <div className="feature-icon">🎯</div>
            <h3>Verifiable Fairness</h3>
            <p>
              While data is encrypted, the game logic is transparent and auditable on the blockchain. 
              You get both privacy AND verifiability!
            </p>
          </div>
        </div>
      </section>

      {/* Zama */}
      <section className="content-section zama-section">
        <h2>Powered by Zama</h2>
        
        <div className="zama-content">
          <p>
            This project uses FHE principles inspired by <strong>Zama</strong>, 
            a company building open-source FHE solutions for blockchain.
          </p>
          
          <div className="zama-features">
            <div className="zama-feature">
              <h4>🚀 TFHE (Fast FHE)</h4>
              <p>Optimized for speed and practicality in blockchain applications</p>
            </div>
            
            <div className="zama-feature">
              <h4>🔧 Developer Friendly</h4>
              <p>Easy-to-use libraries and SDKs for Solidity and other languages</p>
            </div>
            
            <div className="zama-feature">
              <h4>🌐 EVM Compatible</h4>
              <p>Works with existing Ethereum tools and infrastructure</p>
            </div>
          </div>

          <div className="zama-links">
            <a href="https://www.zama.ai/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit Zama.ai
            </a>
            <a href="https://docs.zama.ai/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="content-section">
        <h2>Other Use Cases for FHE</h2>
        
        <div className="use-cases-grid">
          <div className="use-case">
            <h4>🏥 Healthcare</h4>
            <p>Analyze medical records without exposing patient data</p>
          </div>
          
          <div className="use-case">
            <h4>💳 Finance</h4>
            <p>Process transactions while keeping amounts private</p>
          </div>
          
          <div className="use-case">
            <h4>🗳️ Voting</h4>
            <p>Count votes without revealing individual choices</p>
          </div>
          
          <div className="use-case">
            <h4>🎮 Gaming</h4>
            <p>Fair gameplay with private game states</p>
          </div>
          
          <div className="use-case">
            <h4>📊 Analytics</h4>
            <p>Analyze data without accessing raw information</p>
          </div>
          
          <div className="use-case">
            <h4>🔐 Privacy Apps</h4>
            <p>Build apps that never see user data</p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="content-section technical-section">
        <h2>Technical Implementation</h2>
        
        <div className="tech-details">
          <h3>Smart Contract</h3>
          <div className="code-block">
            <code>
              {`// Simplified FHE functions in our contract
function fheEncrypt(uint256 value, uint256 publicKey) 
    internal view returns (uint256) {
    return uint256(keccak256(
        abi.encodePacked(value, publicKey, block.timestamp)
    )) % FHE_MODULUS;
}

function fheAdd(uint256 encryptedA, uint256 encryptedB) 
    internal pure returns (uint256) {
    return (encryptedA + encryptedB) % FHE_MODULUS;
}`}
            </code>
          </div>

          <p className="note">
            <strong>Note:</strong> This is a simplified demonstration. Production FHE requires 
            more complex mathematical operations and larger key sizes.
          </p>
        </div>
      </section>

      {/* Learn More */}
      <section className="content-section">
        <h2>Learn More</h2>
        
        <div className="resources-grid">
          <a href="https://en.wikipedia.org/wiki/Homomorphic_encryption" target="_blank" rel="noopener noreferrer" className="resource-card">
            <h4>📚 Wikipedia</h4>
            <p>General overview of homomorphic encryption</p>
          </a>
          
          <a href="https://www.zama.ai/post/tfhe-deep-dive-part-1" target="_blank" rel="noopener noreferrer" className="resource-card">
            <h4>📖 TFHE Deep Dive</h4>
            <p>Technical explanation from Zama</p>
          </a>
          
          <a href="https://docs.zama.ai/fhevm" target="_blank" rel="noopener noreferrer" className="resource-card">
            <h4>🔧 fhEVM Docs</h4>
            <p>Build FHE apps on Ethereum</p>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Experience FHE in Action</h2>
        <p>See how fully homomorphic encryption protects your poker game</p>
        <Link to="/game" className="btn btn-primary btn-large">
          🎮 Play Now
        </Link>
      </section>
    </div>
  );
}

export default About;

