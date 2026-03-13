import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer – Fußzeile der Anwendung
 * Enthält Links, Copyright und Social-Media-Informationen.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C320,100 640,0 960,50 C1280,100 1440,20 1440,20 L1440,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="footer-content container">
        <div className="footer-grid">
          {/* Über StoryWorld */}
          <div className="footer-section">
            <h3>📚 StoryWorld</h3>
            <p>
              Personalisierte Kinderbücher in mehreren Sprachen. 
              Jedes Kind verdient seine eigene Geschichte!
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Bücher entdecken</Link></li>
              <li><Link to="/about">Über uns</Link></li>
              <li><Link to="/faq">Häufige Fragen</Link></li>
              <li><Link to="/contact">Kontakt</Link></li>
            </ul>
          </div>

          {/* Sprachen */}
          <div className="footer-section">
            <h4>Verfügbare Sprachen</h4>
            <div className="language-flags">
              <span className="flag-item">🇩🇪 Deutsch</span>
              <span className="flag-item">🇬🇧 English</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} StoryWorld. Ein Uni-Projekt für Webprogrammierung.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
