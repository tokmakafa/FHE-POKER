import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import HowToPlay from './pages/HowToPlay';
import About from './pages/About';
import Game from './pages/Game';
import GameFHE from './pages/GameFHE';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/about" element={<About />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game-fhe" element={<GameFHE />} />
          </Routes>
        </main>
        
        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>🃏 FHE Poker</h4>
              <p>Private poker gaming powered by Fully Homomorphic Encryption</p>
            </div>
            
            <div className="footer-section">
              <h4>Links</h4>
              <ul>
                <li><a href="https://www.zama.ai/" target="_blank" rel="noopener noreferrer">Zama.ai</a></li>
                <li><a href="https://docs.zama.ai/" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Network</h4>
              <p>Ethereum Sepolia Testnet</p>
              <p className="text-muted">Contract: 0x81C9...24c0</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 FHE Poker. Built with ❤️ using Zama's FHE principles</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
