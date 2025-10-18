import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🃏</span>
          <span className="logo-text">FHE Poker</span>
        </Link>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            to="/how-to-play" 
            className={`nav-link ${isActive('/how-to-play')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            How to Play
          </Link>
          
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About FHE
          </Link>
          
          <Link 
            to="/game" 
            className={`nav-link nav-cta ${isActive('/game')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            🎮 Play Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

