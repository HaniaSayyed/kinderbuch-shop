import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

/**
 * Navbar – Hauptnavigation der Anwendung
 * Zeigt Logo, Navigationslinks und Warenkorb-Symbol mit Artikelanzahl.
 * Enthält ein responsives Hamburger-Menü für mobile Geräte.
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  /** Prüft ob ein Link aktiv ist */
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">📚</span>
          <span className="logo-text">StoryWorld</span>
        </Link>

        {/* Navigation Links */}
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''} 
              onClick={closeMenu}
            >
              Bücher
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={isActive('/about') ? 'active' : ''} 
              onClick={closeMenu}
            >
              Über uns
            </Link>
          </li>
          <li>
            <Link 
              to="/faq" 
              className={isActive('/faq') ? 'active' : ''} 
              onClick={closeMenu}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={isActive('/contact') ? 'active' : ''} 
              onClick={closeMenu}
            >
              Kontakt
            </Link>
          </li>
        </ul>

        {/* Rechte Seite: Warenkorb + Hamburger */}
        <div className="navbar-actions">
          <Link to="/cart" className="cart-link" onClick={closeMenu}>
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Hamburger Menü für mobil */}
          <button 
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Menü öffnen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
